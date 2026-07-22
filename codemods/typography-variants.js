const TEXT_VARIANTS = {
    subtitle: { regular: 'subheader-2', semibold: 'subheader-1' },
    body: { regular: 'body-3', semibold: 'body-2', bold: 'body-1' },
    copy: { regular: 'callout-2', semibold: 'callout-1' },
    caption: { regular: 'caption-3', semibold: 'caption-2', bold: 'caption-1' },
}

const DYNAMIC = Symbol('dynamic')

function getImportedNames(root, j, importedName) {
    const names = new Set()
    root.find(j.ImportDeclaration, { source: { value: '@doist/reactist' } }).forEach((path) => {
        for (const specifier of path.node.specifiers ?? []) {
            if (
                specifier.type === 'ImportSpecifier' &&
                specifier.imported.type === 'Identifier' &&
                specifier.imported.name === importedName
            ) {
                names.add(specifier.local?.name ?? importedName)
            }
        }
    })
    return names
}

function isImportedBinding(path, name) {
    const bindings = path.scope.lookup(name)?.getBindings()[name] ?? []

    return bindings.some(
        (binding) =>
            binding.parent?.node.type === 'ImportSpecifier' &&
            binding.parent.parent?.node.type === 'ImportDeclaration' &&
            binding.parent.parent.node.source.value === '@doist/reactist' &&
            binding.parent.node.imported.type === 'Identifier' &&
            binding.parent.node.imported.name === 'Text',
    )
}

function getAttribute(openingElement, name) {
    return openingElement.attributes.find(
        (attribute) =>
            attribute.type === 'JSXAttribute' &&
            attribute.name.type === 'JSXIdentifier' &&
            attribute.name.name === name,
    )
}

function getDuplicateAttributes(openingElement, names) {
    return names.filter(
        (name) =>
            openingElement.attributes.filter(
                (attribute) =>
                    attribute.type === 'JSXAttribute' &&
                    attribute.name.type === 'JSXIdentifier' &&
                    attribute.name.name === name,
            ).length > 1,
    )
}

function hasSpread(openingElement) {
    return openingElement.attributes.some((attribute) => attribute.type === 'JSXSpreadAttribute')
}

function readStaticString(attribute, fallback) {
    if (!attribute) return fallback
    if (!attribute.value) return DYNAMIC
    if (attribute.value.type === 'StringLiteral' || attribute.value.type === 'Literal') {
        return String(attribute.value.value)
    }
    if (attribute.value.type !== 'JSXExpressionContainer') return DYNAMIC

    const expression = attribute.value.expression
    if (
        expression.type === 'StringLiteral' ||
        (expression.type === 'Literal' && typeof expression.value === 'string')
    ) {
        return String(expression.value)
    }
    return DYNAMIC
}

function removeAttributes(openingElement, names) {
    openingElement.attributes = openingElement.attributes.filter(
        (attribute) =>
            attribute.type !== 'JSXAttribute' ||
            attribute.name.type !== 'JSXIdentifier' ||
            !names.includes(attribute.name.name),
    )
}

function addVariant(j, openingElement, variant) {
    removeAttributes(openingElement, ['size', 'weight'])
    const levelIndex = openingElement.attributes.findIndex(
        (attribute) =>
            attribute.type === 'JSXAttribute' &&
            attribute.name.type === 'JSXIdentifier' &&
            attribute.name.name === 'level',
    )
    const insertionIndex = levelIndex >= 0 ? levelIndex + 1 : 0
    openingElement.attributes.splice(
        insertionIndex,
        0,
        j.jsxAttribute(j.jsxIdentifier('variant'), j.stringLiteral(variant)),
    )
}

function toJSXName(j, expression) {
    if (expression.type === 'Identifier') return j.jsxIdentifier(expression.name)
    if (expression.type === 'MemberExpression' && !expression.computed) {
        const object = toJSXName(j, expression.object)
        const property = toJSXName(j, expression.property)
        return object && property ? j.jsxMemberExpression(object, property) : null
    }
    return null
}

function getStaticRenderName(j, attribute) {
    if (!attribute?.value) return null
    if (attribute.value.type === 'StringLiteral' || attribute.value.type === 'Literal') {
        return j.jsxIdentifier(String(attribute.value.value))
    }
    if (attribute.value.type !== 'JSXExpressionContainer') return null

    const expression = attribute.value.expression
    if (
        expression.type === 'StringLiteral' ||
        (expression.type === 'Literal' && typeof expression.value === 'string')
    ) {
        return j.jsxIdentifier(String(expression.value))
    }
    return toJSXName(j, expression)
}

function replaceAsWithRender(j, openingElement, asAttribute, renderName) {
    const renderElement = j.jsxElement(j.jsxOpeningElement(renderName, [], true), null, [], true)
    asAttribute.name = j.jsxIdentifier('render')
    asAttribute.value = j.jsxExpressionContainer(renderElement)
}

function markManual(j, api, file, path, reasons) {
    const message = ' TODO(reactist-codemod): ' + reasons.join('; ') + ' '
    const alreadyMarked = path.node.children.some(
        (child) =>
            child.type === 'JSXExpressionContainer' &&
            child.expression.type === 'JSXEmptyExpression' &&
            child.expression.comments?.some((comment) =>
                comment.value.includes('TODO(reactist-codemod)'),
            ),
    )

    if (!alreadyMarked) {
        const emptyExpression = j.jsxEmptyExpression()
        emptyExpression.comments = [j.commentBlock(message)]
        path.node.children.unshift(
            j.jsxText('\n'),
            j.jsxExpressionContainer(emptyExpression),
            j.jsxText('\n'),
        )

        if (path.node.openingElement.selfClosing) {
            const name = path.node.openingElement.name
            path.node.openingElement.selfClosing = false
            path.node.closingElement = j.jsxClosingElement(j.jsxIdentifier(name.name))
        }
    }

    const line = path.node.loc?.start.line ?? 1
    api.report?.(file.path + ':' + line + ' ' + reasons.join('; '))
}

module.exports = function transform(file, api) {
    const j = api.jscodeshift
    const root = j(file.source)
    const textNames = getImportedNames(root, j, 'Text')
    let changed = false

    root.find(j.JSXElement).forEach((path) => {
        const openingElement = path.node.openingElement
        if (
            openingElement.name.type !== 'JSXIdentifier' ||
            !textNames.has(openingElement.name.name) ||
            !isImportedBinding(path, openingElement.name.name)
        )
            return

        const hasVariant = Boolean(getAttribute(openingElement, 'variant'))
        const reasons = []
        if (hasSpread(openingElement))
            reasons.push('spread props may supply or override typography props')
        for (const name of getDuplicateAttributes(openingElement, ['size', 'weight', 'as'])) {
            reasons.push('duplicate Text ' + name + ' props')
        }

        const sizeAttribute = hasVariant ? undefined : getAttribute(openingElement, 'size')
        const weightAttribute = hasVariant ? undefined : getAttribute(openingElement, 'weight')
        const asAttribute = getAttribute(openingElement, 'as')
        const renderAttribute = getAttribute(openingElement, 'render')
        const size = readStaticString(sizeAttribute, 'body')
        const weight = readStaticString(weightAttribute, 'regular')

        if (size === DYNAMIC) reasons.push('dynamic Text size')
        if (weight === DYNAMIC) reasons.push('dynamic Text weight')

        const variant =
            size === DYNAMIC || weight === DYNAMIC ? undefined : TEXT_VARIANTS[size]?.[weight]
        if (!hasVariant && (sizeAttribute || weightAttribute) && !variant && reasons.length === 0) {
            reasons.push('Text size and weight have no exact variant')
        }

        const renderName = asAttribute ? getStaticRenderName(j, asAttribute) : undefined
        if (asAttribute && !renderName) reasons.push('dynamic Text as target')
        if (asAttribute && renderAttribute) reasons.push('Text already has render prop')

        if (reasons.length > 0) {
            markManual(j, api, file, path, reasons)
            changed = true
            return
        }
        if (!hasVariant && (sizeAttribute || weightAttribute)) {
            addVariant(j, openingElement, variant)
            changed = true
        }
        if (asAttribute && renderName) {
            replaceAsWithRender(j, openingElement, asAttribute, renderName)
            changed = true
        }
    })

    return changed ? root.toSource({ quote: 'single' }) : null
}

module.exports.parser = 'tsx'
