import type {
    API,
    ASTPath,
    Collection,
    ConditionalExpression,
    Expression,
    FileInfo,
    Identifier,
    ImportSpecifier,
    JSCodeshift,
    JSXAttribute,
    JSXElement,
    JSXFragment,
    JSXIdentifier,
    JSXMemberExpression,
    JSXOpeningElement,
    Literal,
    MemberExpression,
    Node,
    Options,
    ParenthesizedExpression,
    StringLiteral,
    TemplateLiteral,
    TSAsExpression,
    TSLiteralType,
    TSTypeAssertion,
    TSUnionType,
} from 'jscodeshift'

type NodePath = ASTPath<Node>
type Root = Collection<Node>
type ElementPath = ASTPath<JSXElement>
type RenderName = JSXIdentifier | JSXMemberExpression
type StaticRenderExpression = Identifier | MemberExpression
type MappedVariantExpression = StringLiteral | ConditionalExpression
type ManualReporter = {
    readonly count: number
    report(line: number, reasons: string[]): void
}
type ImportSpecifierWithKind = ImportSpecifier & {
    importKind?: 'type' | 'typeof' | 'value'
}

const TEXT_VARIANTS: Record<string, Record<string, string>> = {
    subtitle: { regular: 'subheader-2', semibold: 'subheader-1', bold: 'subheader-1' },
    body: { regular: 'body-3', semibold: 'body-2', bold: 'body-1' },
    copy: { regular: 'callout-2', semibold: 'callout-1', bold: 'callout-1' },
    caption: { regular: 'caption-3', semibold: 'caption-2', bold: 'caption-1' },
}

const HEADING_SIZES: Record<number, Record<string, number>> = {
    1: { default: 20, smaller: 16, larger: 24, largest: 32 },
    2: { default: 16, smaller: 14, larger: 20, largest: 24 },
    3: { default: 14, smaller: 12, larger: 16, largest: 20 },
    4: { default: 14, smaller: 14, larger: 16, largest: 20 },
    5: { default: 14, smaller: 14, larger: 16, largest: 20 },
    6: { default: 14, smaller: 14, larger: 16, largest: 20 },
}

const HEADING_WEIGHTS: Record<string, number> = {
    regular: 700,
    medium: 600,
    light: 400,
}

const HEADING_VARIANTS: Record<string, string> = {
    '32:700': 'header-1',
    '24:700': 'header-2',
    '20:700': 'header-3',
    '16:700': 'subheader-1',
    '16:600': 'subheader-1',
    '16:400': 'subheader-2',
    '14:700': 'body-1',
    '14:600': 'body-2',
    '14:400': 'body-3',
    '12:700': 'caption-1',
    '12:600': 'caption-2',
    '12:400': 'caption-3',
}

const NAMED_HEADING_VARIANTS: Record<string, string> = {
    'heading-1': 'header-1',
    'heading-2': 'header-2',
    'heading-3': 'header-3',
    'heading-4': 'header-4',
    'header-1': 'header-1',
    'header-2': 'header-2',
    'header-3': 'header-3',
    'header-4': 'header-4',
}

const REMOVED_TYPE_IMPORTS = new Set([
    'DisplayProps',
    'DisplayVariant',
    'HeadingLevel',
    'HeadingProps',
    'HeadingVariant',
])

const LEGACY_NAMESPACE_MEMBERS = new Set(['Display', 'Heading', 'Text'])
const REMOVED_TEXT_PROP_NAMES = new Set(['as', 'size', 'weight'])

const TEXT_OWNED_PROPS = new Set([
    'align',
    'case',
    'children',
    'decoration',
    'exceptionallySetClassName',
    'key',
    'lineClamp',
    'ref',
    'tone',
    'variant',
])

const DYNAMIC = Symbol('dynamic')

function hasRootReactistImport(source: string): boolean {
    let importStatement = ''
    let blockComment = false
    let braceDepth = 0

    for (const rawLine of source.split(/\r?\n/)) {
        let line = ''
        for (let index = 0; index < rawLine.length; index += 1) {
            const pair = rawLine.slice(index, index + 2)
            if (blockComment) {
                if (pair === '*/') {
                    blockComment = false
                    index += 1
                }
                continue
            }
            if (pair === '/*') {
                blockComment = true
                index += 1
                continue
            }
            if (pair === '//') break
            line += rawLine[index]
        }

        const trimmedLine = line.trim()
        if (!importStatement) {
            if (!/^(?:import|export)\b/.test(trimmedLine)) continue
            importStatement = trimmedLine
        } else {
            importStatement += ' ' + trimmedLine
        }

        for (const character of trimmedLine) {
            if (character === '{') braceDepth += 1
            if (character === '}') braceDepth -= 1
        }
        if (/(?:\bfrom\s*|^import\s*)['"]@doist\/reactist['"]/.test(importStatement)) {
            return true
        }
        if (braceDepth <= 0) importStatement = ''
    }

    return false
}

function getExistingManualReasons(source: string): string[] {
    return Array.from(source.matchAll(/TODO\(reactist-codemod\): ([^*\n]+)/g), (match) =>
        match[1]?.trim(),
    ).filter((reason): reason is string => Boolean(reason))
}

function recordManualStats(api: API, reasons: string[]): void {
    api.stats?.('manual migrations')
    for (const reason of reasons) {
        for (const category of reason.split('; ')) {
            api.stats?.('manual reason: ' + category)
        }
    }
}

function createManualReporter(api: API, existingReasons: string[]): ManualReporter {
    let count = existingReasons.length
    for (const reason of existingReasons) recordManualStats(api, [reason])

    return {
        get count() {
            return count
        },
        report(line, reasons) {
            count += 1
            recordManualStats(api, reasons)
            api.report?.('line ' + line + ': ' + reasons.join('; '))
        },
    }
}

function getImportedNames(root: Root, j: JSCodeshift, importedName: string): Set<string> {
    const names = new Set<string>()
    root.find(j.ImportDeclaration, { source: { value: '@doist/reactist' } }).forEach((path) => {
        for (const specifier of path.node.specifiers ?? []) {
            if (
                specifier.type === 'ImportSpecifier' &&
                specifier.imported.type === 'Identifier' &&
                specifier.imported.name === importedName
            ) {
                names.add(
                    specifier.local?.type === 'Identifier' ? specifier.local.name : importedName,
                )
            }
        }
    })
    return names
}

function getNamespaceNames(root: Root, j: JSCodeshift): Set<string> {
    const names = new Set<string>()
    root.find(j.ImportDeclaration, { source: { value: '@doist/reactist' } }).forEach((path) => {
        for (const specifier of path.node.specifiers ?? []) {
            if (
                specifier.type === 'ImportNamespaceSpecifier' &&
                specifier.local?.type === 'Identifier'
            ) {
                names.add(specifier.local.name)
            }
        }
    })
    return names
}

function isImportedBinding(path: NodePath, name: string, importedName: string): boolean {
    // ast-types exposes scope and parent paths as `any`.
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
    const bindings = path.scope.lookup(name)?.getBindings()[name] ?? []

    return bindings.some(
        (binding: NodePath) =>
            binding.parent?.node.type === 'ImportSpecifier' &&
            binding.parent.parent?.node.type === 'ImportDeclaration' &&
            binding.parent.parent.node.source.value === '@doist/reactist' &&
            binding.parent.node.imported.type === 'Identifier' &&
            binding.parent.node.imported.name === importedName,
    )
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
}

function isImportedNamespaceBinding(path: NodePath, name: string): boolean {
    // ast-types exposes scope and parent paths as `any`.
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
    const bindings = path.scope.lookup(name)?.getBindings()[name] ?? []

    return bindings.some(
        (binding: NodePath) =>
            binding.parent?.node.type === 'ImportNamespaceSpecifier' &&
            binding.parent.parent?.node.type === 'ImportDeclaration' &&
            binding.parent.parent.node.source.value === '@doist/reactist',
    )
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
}

function isDirectJSXReference(path: NodePath): boolean {
    // ast-types exposes parent paths as `any`.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (
        path.name === 'name' &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        ['JSXOpeningElement', 'JSXClosingElement'].includes(path.parent?.node.type)
    )
}

function isNonReferenceIdentifier(path: NodePath): boolean {
    // ast-types exposes parent paths as `any`.
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
    const parent = path.parent?.node
    if (!parent) return false

    if (parent.type === 'ImportSpecifier') return true
    if (
        parent.type === 'ExportSpecifier' &&
        (path.name === 'exported' || path.parent?.parent?.node.source)
    ) {
        return true
    }
    if (parent.type === 'JSXAttribute' && path.name === 'name') return true
    if (parent.type === 'JSXMemberExpression' && path.name === 'property') return true
    if (parent.type === 'JSXNamespacedName') return true
    if (
        ['MemberExpression', 'OptionalMemberExpression'].includes(parent.type) &&
        path.name === 'property' &&
        !parent.computed
    ) {
        return true
    }
    if (
        [
            'ClassMethod',
            'ClassProperty',
            'MethodDefinition',
            'ObjectMethod',
            'ObjectProperty',
            'ObjectTypeProperty',
            'Property',
            'PropertyDefinition',
            'TSMethodSignature',
            'TSPropertySignature',
        ].includes(parent.type) &&
        path.name === 'key' &&
        !parent.computed
    ) {
        return true
    }
    if (parent.type === 'TSQualifiedName' && path.name === 'right') return true
    if (parent.type === 'QualifiedTypeIdentifier' && path.name === 'id') return true
    if (parent.type === 'TSEnumMember' && path.name === 'id' && !parent.computed) return true
    if (parent.type === 'LabeledStatement' && path.name === 'label') return true
    if (['BreakStatement', 'ContinueStatement'].includes(parent.type) && path.name === 'label') {
        return true
    }

    return false
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
}

function markStatement(
    j: JSCodeshift,
    reporter: ManualReporter,
    path: NodePath,
    reason: string,
): boolean {
    // ast-types exposes parent paths as `any`.
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
    let statementPath = path
    while (
        statementPath.parent?.node &&
        !['BlockStatement', 'Program'].includes(statementPath.parent.node.type)
    ) {
        statementPath = statementPath.parent
    }

    const marker = 'TODO(reactist-codemod): ' + reason
    const alreadyMarked = statementPath.node.comments?.some((comment) =>
        comment.value.includes(marker),
    )
    if (alreadyMarked) return false

    statementPath.node.comments = [
        ...(statementPath.node.comments ?? []),
        j.commentBlock(' ' + marker + ' ', true, false),
    ]
    const line = path.node.loc?.start.line ?? 1
    reporter.report(line, [reason])
    return true
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
}

function markIndirectHeadingReferences(
    root: Root,
    j: JSCodeshift,
    reporter: ManualReporter,
    headingNames: Set<string>,
): boolean {
    let changed = false

    headingNames.forEach((name) => {
        root.find(j.Identifier, { name }).forEach((path) => {
            if (!isImportedBinding(path, name, 'Heading')) return
            if (isNonReferenceIdentifier(path) || isDirectJSXReference(path)) return
            changed = markStatement(j, reporter, path, 'indirect Heading reference') || changed
        })
    })

    return changed
}

function markRemovedTypeImports(root: Root, j: JSCodeshift, reporter: ManualReporter): boolean {
    let changed = false

    root.find(j.ImportDeclaration, { source: { value: '@doist/reactist' } }).forEach((path) => {
        for (const specifier of path.node.specifiers ?? []) {
            if (
                specifier.type !== 'ImportSpecifier' ||
                specifier.imported.type !== 'Identifier' ||
                !REMOVED_TYPE_IMPORTS.has(specifier.imported.name)
            ) {
                continue
            }

            const reason = 'removed ' + specifier.imported.name + ' type requires manual migration'
            const marker = 'TODO(reactist-codemod): ' + reason
            if (specifier.comments?.some((comment) => comment.value.includes(marker))) continue

            specifier.comments = [
                ...(specifier.comments ?? []),
                j.commentBlock(' ' + marker + ' ', true, false),
            ]
            const line = specifier.loc?.start.line ?? 1
            reporter.report(line, [reason])
            changed = true
        }
    })

    return changed
}

function getLiteralTypeNames(node: Node): string[] {
    if (node.type === 'TSUnionType') {
        return (node as TSUnionType).types.flatMap((type) => getLiteralTypeNames(type))
    }
    if (node.type !== 'TSLiteralType') return []
    const { literal } = node as TSLiteralType
    if (literal.type === 'StringLiteral' && typeof literal.value === 'string') {
        return [literal.value]
    }
    return []
}

function markLegacyTextPropsReferences(
    root: Root,
    j: JSCodeshift,
    reporter: ManualReporter,
): boolean {
    let changed = false

    root.find(j.TSIndexedAccessType).forEach((path) => {
        const { objectType, indexType } = path.node
        if (
            objectType.type !== 'TSTypeReference' ||
            objectType.typeName.type !== 'Identifier' ||
            objectType.typeName.name !== 'TextProps' ||
            !isImportedBinding(path, 'TextProps', 'TextProps')
        ) {
            return
        }

        const [name] = getLiteralTypeNames(indexType)
        if (!name || !REMOVED_TEXT_PROP_NAMES.has(name)) return
        changed =
            markStatement(
                j,
                reporter,
                path,
                "TextProps['" + name + "'] uses a removed Text prop",
            ) || changed
    })

    root.find(j.TSTypeReference).forEach((path) => {
        if (path.node.typeName.type !== 'Identifier' || path.node.typeName.name !== 'Pick') return
        const parameters = path.node.typeParameters?.params ?? []
        const sourceType = parameters[0]
        const keysType = parameters[1]
        if (
            sourceType?.type !== 'TSTypeReference' ||
            sourceType.typeName.type !== 'Identifier' ||
            sourceType.typeName.name !== 'TextProps' ||
            !keysType ||
            !isImportedBinding(path, 'TextProps', 'TextProps')
        ) {
            return
        }

        const removedNames = getLiteralTypeNames(keysType).filter((name) =>
            REMOVED_TEXT_PROP_NAMES.has(name),
        )
        if (removedNames.length === 0) return
        changed =
            markStatement(
                j,
                reporter,
                path,
                'Pick<TextProps> includes removed ' + removedNames.join(' and ') + ' props',
            ) || changed
    })

    return changed
}

function markLegacyReexports(root: Root, j: JSCodeshift, reporter: ManualReporter): boolean {
    let changed = false

    root.find(j.ExportNamedDeclaration, { source: { value: '@doist/reactist' } }).forEach(
        (path) => {
            for (const specifier of path.node.specifiers ?? []) {
                if (specifier.type !== 'ExportSpecifier') continue
                const local = specifier.local
                if (local?.type !== 'Identifier' || typeof local.name !== 'string') continue

                const name = local.name
                if (!REMOVED_TYPE_IMPORTS.has(name) && !['Display', 'Heading'].includes(name))
                    continue

                changed =
                    markStatement(
                        j,
                        reporter,
                        path,
                        're-exported ' + name + ' requires manual migration',
                    ) || changed
            }
        },
    )

    return changed
}

function markNamespaceDestructuring(
    root: Root,
    j: JSCodeshift,
    reporter: ManualReporter,
    namespaceNames: Set<string>,
): boolean {
    let changed = false

    root.find(j.VariableDeclarator).forEach((path) => {
        if (path.node.init?.type !== 'Identifier' || path.node.id.type !== 'ObjectPattern') return
        const namespaceName = path.node.init.name
        if (!namespaceNames.has(namespaceName)) return
        if (!isImportedNamespaceBinding(path, namespaceName)) return

        for (const property of path.node.id.properties) {
            if (
                (property.type !== 'ObjectProperty' && property.type !== 'Property') ||
                property.key.type !== 'Identifier' ||
                typeof property.key.name !== 'string' ||
                !LEGACY_NAMESPACE_MEMBERS.has(property.key.name)
            ) {
                continue
            }

            changed =
                markStatement(
                    j,
                    reporter,
                    path,
                    'namespace ' + property.key.name + ' destructuring requires manual migration',
                ) || changed
        }
    })

    return changed
}

function getMemberPropertyName(path: ASTPath<MemberExpression>): string | undefined {
    const { property, computed } = path.node
    if (!computed && property.type === 'Identifier') return property.name
    if (
        computed &&
        (property.type === 'StringLiteral' || property.type === 'Literal') &&
        typeof property.value === 'string'
    ) {
        return property.value
    }
    return undefined
}

function markIndirectNamespaceReferences(
    root: Root,
    j: JSCodeshift,
    reporter: ManualReporter,
    namespaceNames: Set<string>,
): boolean {
    let changed = false

    root.find(j.MemberExpression).forEach((path) => {
        if (path.node.object.type !== 'Identifier') return
        const namespaceName = path.node.object.name
        if (!namespaceNames.has(namespaceName)) return
        if (!isImportedNamespaceBinding(path, namespaceName)) return

        const propertyName = getMemberPropertyName(path)
        if (!propertyName || !LEGACY_NAMESPACE_MEMBERS.has(propertyName)) return

        changed =
            markStatement(
                j,
                reporter,
                path,
                'namespace ' + propertyName + ' reference requires manual migration',
            ) || changed
    })

    root.find(j.TSQualifiedName).forEach((path) => {
        if (path.node.left.type !== 'Identifier' || path.node.right.type !== 'Identifier') return
        const namespaceName = path.node.left.name
        const propertyName = path.node.right.name
        if (!namespaceNames.has(namespaceName)) return
        if (!isImportedNamespaceBinding(path, namespaceName)) return
        if (
            !REMOVED_TYPE_IMPORTS.has(propertyName) &&
            !LEGACY_NAMESPACE_MEMBERS.has(propertyName)
        ) {
            return
        }

        changed =
            markStatement(
                j,
                reporter,
                path,
                'namespace ' + propertyName + ' type requires manual migration',
            ) || changed
    })

    return changed
}

function getAttribute(openingElement: JSXOpeningElement, name: string): JSXAttribute | undefined {
    return (openingElement.attributes ?? []).find(
        (attribute) =>
            attribute.type === 'JSXAttribute' &&
            attribute.name.type === 'JSXIdentifier' &&
            attribute.name.name === name,
    ) as JSXAttribute | undefined
}

function getDuplicateAttributes(openingElement: JSXOpeningElement, names: string[]): string[] {
    return names.filter(
        (name) =>
            (openingElement.attributes ?? []).filter(
                (attribute) =>
                    attribute.type === 'JSXAttribute' &&
                    attribute.name.type === 'JSXIdentifier' &&
                    attribute.name.name === name,
            ).length > 1,
    )
}

function hasSpread(openingElement: JSXOpeningElement): boolean {
    return (openingElement.attributes ?? []).some(
        (attribute) => attribute.type === 'JSXSpreadAttribute',
    )
}

function readStaticString(
    attribute: JSXAttribute | undefined,
    fallback: string | typeof DYNAMIC,
): string | typeof DYNAMIC {
    if (!attribute) return fallback
    if (!attribute.value) return DYNAMIC
    if (attribute.value.type === 'StringLiteral' || attribute.value.type === 'Literal') {
        return String(attribute.value.value)
    }
    if (attribute.value.type !== 'JSXExpressionContainer') return DYNAMIC

    const expression = attribute.value.expression
    if (expression.type === 'JSXEmptyExpression') return DYNAMIC
    return readStaticExpression(expression, fallback)
}

function readStaticExpression(
    expression: Expression,
    fallback: string | typeof DYNAMIC,
): string | typeof DYNAMIC {
    if (
        expression.type === 'StringLiteral' ||
        (expression.type === 'Literal' && typeof (expression as Literal).value === 'string')
    ) {
        return String((expression as StringLiteral).value)
    }
    if (expression.type === 'Identifier' && (expression as Identifier).name === 'undefined') {
        return fallback
    }
    if (
        expression.type === 'TemplateLiteral' &&
        (expression as TemplateLiteral).expressions.length === 0
    ) {
        return (expression as TemplateLiteral).quasis[0]?.value.cooked ?? DYNAMIC
    }
    const wrappedExpression = getWrappedExpression(expression)
    if (wrappedExpression) return readStaticExpression(wrappedExpression, fallback)
    return DYNAMIC
}

function getWrappedExpression(expression: Expression): Expression | undefined {
    if (
        expression.type !== 'ParenthesizedExpression' &&
        expression.type !== 'TSAsExpression' &&
        expression.type !== 'TSTypeAssertion'
    ) {
        return undefined
    }
    return (expression as ParenthesizedExpression | TSAsExpression | TSTypeAssertion).expression
}

function mapFiniteStringExpression(
    j: JSCodeshift,
    expression: Expression,
    fallback: string,
    mapValue: (value: string) => string | undefined,
): MappedVariantExpression | null {
    const value = readStaticExpression(expression, fallback)
    if (value !== DYNAMIC) {
        const mapped = mapValue(value)
        return mapped ? j.stringLiteral(mapped) : null
    }
    if (expression.type === 'ConditionalExpression') {
        const conditional = expression as ConditionalExpression
        const consequent = mapFiniteStringExpression(j, conditional.consequent, fallback, mapValue)
        const alternate = mapFiniteStringExpression(j, conditional.alternate, fallback, mapValue)
        if (!consequent || !alternate) return null
        return j.conditionalExpression(conditional.test, consequent, alternate)
    }
    const wrappedExpression = getWrappedExpression(expression)
    if (wrappedExpression) {
        return mapFiniteStringExpression(j, wrappedExpression, fallback, mapValue)
    }
    return null
}

function mapFiniteStringPair(
    j: JSCodeshift,
    first: Expression,
    firstFallback: string,
    second: Expression,
    secondFallback: string,
    mapValues: (firstValue: string, secondValue: string) => string | undefined,
): MappedVariantExpression | null {
    const firstValue = readStaticExpression(first, firstFallback)
    const secondValue = readStaticExpression(second, secondFallback)
    if (firstValue !== DYNAMIC && secondValue !== DYNAMIC) {
        const mapped = mapValues(firstValue, secondValue)
        return mapped ? j.stringLiteral(mapped) : null
    }

    const wrappedFirst = getWrappedExpression(first)
    if (wrappedFirst) {
        return mapFiniteStringPair(
            j,
            wrappedFirst,
            firstFallback,
            second,
            secondFallback,
            mapValues,
        )
    }
    const wrappedSecond = getWrappedExpression(second)
    if (wrappedSecond) {
        return mapFiniteStringPair(
            j,
            first,
            firstFallback,
            wrappedSecond,
            secondFallback,
            mapValues,
        )
    }
    if (first.type === 'ConditionalExpression') {
        const conditional = first as ConditionalExpression
        const consequent = mapFiniteStringPair(
            j,
            conditional.consequent,
            firstFallback,
            second,
            secondFallback,
            mapValues,
        )
        const alternate = mapFiniteStringPair(
            j,
            conditional.alternate,
            firstFallback,
            second,
            secondFallback,
            mapValues,
        )
        if (!consequent || !alternate) return null
        return j.conditionalExpression(conditional.test, consequent, alternate)
    }
    if (second.type === 'ConditionalExpression') {
        const conditional = second as ConditionalExpression
        const consequent = mapFiniteStringPair(
            j,
            first,
            firstFallback,
            conditional.consequent,
            secondFallback,
            mapValues,
        )
        const alternate = mapFiniteStringPair(
            j,
            first,
            firstFallback,
            conditional.alternate,
            secondFallback,
            mapValues,
        )
        if (!consequent || !alternate) return null
        return j.conditionalExpression(conditional.test, consequent, alternate)
    }
    return null
}

function getAttributeExpression(attribute: JSXAttribute): Expression | undefined {
    if (
        attribute.value?.type !== 'JSXExpressionContainer' ||
        attribute.value.expression.type === 'JSXEmptyExpression'
    ) {
        return undefined
    }
    return attribute.value.expression
}

function mapFiniteStringAttribute(
    j: JSCodeshift,
    attribute: JSXAttribute,
    fallback: string,
    mapValue: (value: string) => string | undefined,
): MappedVariantExpression | null {
    if (attribute.value?.type !== 'JSXExpressionContainer') return null
    const { expression } = attribute.value
    if (expression.type === 'JSXEmptyExpression') return null
    return mapFiniteStringExpression(j, expression, fallback, mapValue)
}

function readStaticLevel(attribute: JSXAttribute | undefined): number | typeof DYNAMIC {
    const value = readStaticString(attribute, DYNAMIC)
    if (value !== DYNAMIC && /^[1-6]$/.test(value)) return Number(value)

    if (attribute?.value?.type !== 'JSXExpressionContainer') return DYNAMIC
    const expression = attribute.value.expression
    if (
        (expression.type === 'NumericLiteral' || expression.type === 'Literal') &&
        typeof expression.value === 'number' &&
        Number.isInteger(expression.value) &&
        expression.value >= 1 &&
        expression.value <= 6
    ) {
        return Number(expression.value)
    }

    return DYNAMIC
}

function removeAttributes(openingElement: JSXOpeningElement, names: string[]): void {
    openingElement.attributes = (openingElement.attributes ?? []).filter(
        (attribute) =>
            attribute.type !== 'JSXAttribute' ||
            attribute.name.type !== 'JSXIdentifier' ||
            !names.includes(attribute.name.name),
    )
}

function createVariantAttribute(
    j: JSCodeshift,
    variant: string | MappedVariantExpression,
): JSXAttribute {
    return j.jsxAttribute(
        j.jsxIdentifier('variant'),
        typeof variant === 'string' ? j.stringLiteral(variant) : j.jsxExpressionContainer(variant),
    )
}

function addVariant(
    j: JSCodeshift,
    openingElement: JSXOpeningElement,
    variant: string | MappedVariantExpression,
): void {
    removeAttributes(openingElement, ['size', 'weight'])
    const attributes = openingElement.attributes ?? []
    openingElement.attributes = attributes
    const levelIndex = attributes.findIndex(
        (attribute) =>
            attribute.type === 'JSXAttribute' &&
            attribute.name.type === 'JSXIdentifier' &&
            attribute.name.name === 'level',
    )
    const insertionIndex = levelIndex >= 0 ? levelIndex + 1 : 0
    attributes.splice(insertionIndex, 0, createVariantAttribute(j, variant))
}

function replaceHeadingProps(
    j: JSCodeshift,
    openingElement: JSXOpeningElement,
    variant: string | MappedVariantExpression,
    level: number | undefined,
): void {
    removeAttributes(openingElement, ['level', 'size', 'weight', 'variant'])

    const attributes = [createVariantAttribute(j, variant)]
    if (level && (typeof variant !== 'string' || variant !== 'header-' + level)) {
        const renderName = j.jsxIdentifier('h' + level)
        const renderElement = j.jsxElement(j.jsxOpeningElement(renderName, [], true), null, [])
        attributes.push(
            j.jsxAttribute(j.jsxIdentifier('render'), j.jsxExpressionContainer(renderElement)),
        )
    }
    openingElement.attributes = openingElement.attributes ?? []
    openingElement.attributes.unshift(...attributes)
}

function hasImportComments(specifier: ImportSpecifier): boolean {
    return Boolean(
        specifier.comments?.length ||
            specifier.imported.comments?.length ||
            specifier.local?.comments?.length,
    )
}

function canRenameToText(path: NodePath): boolean {
    // ast-types exposes scope as `any`.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return !path.scope.lookup('Text') || isImportedBinding(path, 'Text', 'Text')
}

function consolidateDirectComponentImports(root: Root, j: JSCodeshift): boolean {
    let changed = false
    let hasTextImport = getImportedNames(root, j, 'Text').has('Text')

    root.find(j.ImportDeclaration, { source: { value: '@doist/reactist' } }).forEach(
        (importPath) => {
            const declarationIsTypeOnly = importPath.node.importKind === 'type'
            const originalSpecifierCount = importPath.node.specifiers?.length ?? 0
            const nextSpecifiers = []

            for (const specifier of importPath.node.specifiers ?? []) {
                if (
                    declarationIsTypeOnly ||
                    specifier.type !== 'ImportSpecifier' ||
                    specifier.imported.type !== 'Identifier' ||
                    !['Display', 'Heading'].includes(specifier.imported.name) ||
                    (specifier as ImportSpecifierWithKind).importKind === 'type' ||
                    specifier.local?.type !== 'Identifier' ||
                    specifier.local.name !== specifier.imported.name ||
                    hasImportComments(specifier)
                ) {
                    nextSpecifiers.push(specifier)
                    continue
                }

                const importedName = specifier.imported.name
                const references: NodePath[] = []
                let hasUnsafeReference = false
                root.find(j.Identifier, { name: importedName }).forEach((path) => {
                    if (!isImportedBinding(path, importedName, importedName)) return
                    if (isNonReferenceIdentifier(path)) return
                    if (!isDirectJSXReference(path) || !canRenameToText(path)) {
                        hasUnsafeReference = true
                        return
                    }
                    // ast-types exposes parent paths as `any`.
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    if (path.parent?.node.type === 'JSXOpeningElement') {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        const elementPath = path.parent.parent as ElementPath
                        if (hasManualMarker(elementPath)) {
                            hasUnsafeReference = true
                            return
                        }
                    }
                    references.push(path)
                })

                if (hasUnsafeReference) {
                    nextSpecifiers.push(specifier)
                    continue
                }

                if (references.length === 0) {
                    changed = true
                    continue
                }
                for (const reference of references) {
                    ;(reference.node as Identifier).name = 'Text'
                }
                if (!hasTextImport) {
                    nextSpecifiers.push(j.importSpecifier(j.identifier('Text')))
                    hasTextImport = true
                }
                changed = true
            }

            importPath.node.specifiers = nextSpecifiers
            if (originalSpecifierCount > 0 && nextSpecifiers.length === 0) {
                j(importPath).remove()
            }
        },
    )

    return changed
}

function replaceMergedComponentImports(root: Root, j: JSCodeshift): boolean {
    let changed = consolidateDirectComponentImports(root, j)

    root.find(j.ImportDeclaration, { source: { value: '@doist/reactist' } }).forEach((path) => {
        path.node.specifiers = (path.node.specifiers ?? []).map((specifier) => {
            if (
                specifier.type === 'ImportSpecifier' &&
                specifier.imported.type === 'Identifier' &&
                ['Display', 'Heading'].includes(specifier.imported.name)
            ) {
                const localName =
                    specifier.local?.type === 'Identifier'
                        ? specifier.local.name
                        : specifier.imported.name
                const replacement = j.importSpecifier(j.identifier('Text'), j.identifier(localName))
                ;(replacement as ImportSpecifierWithKind).importKind = (
                    specifier as ImportSpecifierWithKind
                ).importKind
                replacement.comments = specifier.comments
                replacement.imported.comments = specifier.imported.comments
                if (replacement.local) replacement.local.comments = specifier.local?.comments
                changed = true
                return replacement
            }
            return specifier
        })
    })

    return changed
}

function toJSXName(j: JSCodeshift, expression: StaticRenderExpression): RenderName | null {
    if (expression.type === 'Identifier') return j.jsxIdentifier(expression.name)
    if (expression.type === 'MemberExpression' && !expression.computed) {
        const objectExpression = expression.object
        if (
            objectExpression.type !== 'Identifier' &&
            objectExpression.type !== 'MemberExpression'
        ) {
            return null
        }
        const object = toJSXName(j, objectExpression)
        if (!object || expression.property.type !== 'Identifier') return null
        return j.jsxMemberExpression(object, j.jsxIdentifier(expression.property.name))
    }
    return null
}

function getStaticRenderName(
    j: JSCodeshift,
    attribute: JSXAttribute | undefined,
): RenderName | null {
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
    if (expression.type === 'Identifier' && /^[A-Z]/.test(expression.name)) {
        return j.jsxIdentifier(expression.name)
    }
    if (expression.type === 'MemberExpression' && !expression.computed) {
        return toJSXName(j, expression)
    }
    return null
}

function replaceAsWithRender(
    j: JSCodeshift,
    openingElement: JSXOpeningElement,
    asAttribute: JSXAttribute,
    renderName: RenderName,
): void {
    const targetAttributes = (openingElement.attributes ?? []).filter(
        (attribute) =>
            attribute.type === 'JSXAttribute' &&
            attribute !== asAttribute &&
            attribute.name.type === 'JSXIdentifier' &&
            !['size', 'weight'].includes(attribute.name.name) &&
            !TEXT_OWNED_PROPS.has(attribute.name.name),
    ) as JSXAttribute[]
    openingElement.attributes = (openingElement.attributes ?? []).filter(
        (attribute) => !targetAttributes.includes(attribute as JSXAttribute),
    )
    const renderElement = j.jsxElement(
        j.jsxOpeningElement(renderName, targetAttributes, true),
        null,
        [],
    )
    asAttribute.name = j.jsxIdentifier('render')
    asAttribute.value = j.jsxExpressionContainer(renderElement)
}

function getJSXParent(path: ElementPath): JSXElement | JSXFragment | undefined {
    // ast-types exposes parent paths as `any`.
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const parent = path.parent?.node
    const jsxParent =
        parent?.type === 'JSXElement' || parent?.type === 'JSXFragment' ? parent : undefined
    return jsxParent as JSXElement | JSXFragment | undefined
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
}

function hasManualMarker(path: ElementPath): boolean {
    if (path.node.comments?.some((comment) => comment.value.includes('TODO(reactist-codemod)'))) {
        return true
    }

    const parent = getJSXParent(path)
    if (parent) {
        const children = parent.children ?? []
        const index = children.indexOf(path.node)
        for (let current = index - 1; current >= 0; current -= 1) {
            const sibling = children[current]
            if (!sibling) break
            if (sibling.type === 'JSXText' && sibling.value.trim() === '') continue
            if (
                sibling.type === 'JSXExpressionContainer' &&
                sibling.expression.type === 'JSXEmptyExpression' &&
                Boolean(
                    sibling.expression.comments?.some((comment) =>
                        comment.value.includes('TODO(reactist-codemod)'),
                    ),
                )
            ) {
                return true
            }
            break
        }
    }

    return (path.node.children ?? []).some(
        (child) =>
            child.type === 'JSXExpressionContainer' &&
            child.expression.type === 'JSXEmptyExpression' &&
            child.expression.comments?.some((comment) =>
                comment.value.includes('TODO(reactist-codemod)'),
            ),
    )
}

function markManual(
    j: JSCodeshift,
    reporter: ManualReporter,
    path: ElementPath,
    reasons: string[],
): void {
    const message = ' TODO(reactist-codemod): ' + reasons.join('; ') + ' '
    const alreadyMarked = hasManualMarker(path)

    if (!alreadyMarked) {
        const emptyExpression = j.jsxEmptyExpression()
        emptyExpression.comments = [j.commentBlock(message)]
        const parent = getJSXParent(path)
        if (parent) {
            path.insertBefore(j.jsxExpressionContainer(emptyExpression))
        } else {
            path.node.comments = [...(path.node.comments ?? []), j.commentBlock(message)]
        }
    }

    const line = path.node.loc?.start.line ?? 1
    reporter.report(line, reasons)
}

function markNamespaceJSXReferences(
    root: Root,
    j: JSCodeshift,
    reporter: ManualReporter,
    namespaceNames: Set<string>,
): boolean {
    let changed = false

    root.find(j.JSXElement).forEach((path) => {
        if (hasManualMarker(path)) return
        const name = path.node.openingElement.name
        if (
            name.type !== 'JSXMemberExpression' ||
            name.object.type !== 'JSXIdentifier' ||
            name.property.type !== 'JSXIdentifier'
        ) {
            return
        }

        const namespaceName = name.object.name
        const propertyName = name.property.name
        if (typeof namespaceName !== 'string' || typeof propertyName !== 'string') return
        if (!namespaceNames.has(namespaceName)) return
        if (!LEGACY_NAMESPACE_MEMBERS.has(propertyName)) return
        if (!isImportedNamespaceBinding(path, namespaceName)) return

        markManual(j, reporter, path, [
            'namespace ' + propertyName + ' reference requires manual migration',
        ])
        changed = true
    })

    return changed
}

function transformTextElement(
    j: JSCodeshift,
    reporter: ManualReporter,
    path: ElementPath,
): boolean {
    if (hasManualMarker(path)) return false

    const openingElement = path.node.openingElement
    const hasVariant = Boolean(getAttribute(openingElement, 'variant'))
    const legacySizeAttribute = getAttribute(openingElement, 'size')
    const legacyWeightAttribute = getAttribute(openingElement, 'weight')
    const reasons = []
    if (hasSpread(openingElement)) reasons.push('spread props may supply or override text props')
    for (const name of getDuplicateAttributes(openingElement, ['size', 'weight', 'as'])) {
        reasons.push('duplicate Text ' + name + ' props')
    }

    if (hasVariant && (legacySizeAttribute || legacyWeightAttribute)) {
        reasons.push('Text mixes variant with legacy size or weight props')
    }

    const sizeAttribute = hasVariant ? undefined : legacySizeAttribute
    const weightAttribute = hasVariant ? undefined : legacyWeightAttribute
    const asAttribute = getAttribute(openingElement, 'as')
    const renderAttribute = getAttribute(openingElement, 'render')
    const size = readStaticString(sizeAttribute, 'body')
    const weight = readStaticString(weightAttribute, 'regular')

    let variant: string | MappedVariantExpression | undefined
    if (size !== DYNAMIC && weight !== DYNAMIC) {
        variant = TEXT_VARIANTS[size]?.[weight]
    } else if (size === DYNAMIC && weight !== DYNAMIC && sizeAttribute) {
        variant =
            mapFiniteStringAttribute(
                j,
                sizeAttribute,
                'body',
                (value) => TEXT_VARIANTS[value]?.[weight],
            ) ?? undefined
    } else if (weight === DYNAMIC && size !== DYNAMIC && weightAttribute) {
        variant =
            mapFiniteStringAttribute(
                j,
                weightAttribute,
                'regular',
                (value) => TEXT_VARIANTS[size]?.[value],
            ) ?? undefined
    } else if (sizeAttribute && weightAttribute) {
        const sizeExpression = getAttributeExpression(sizeAttribute)
        const weightExpression = getAttributeExpression(weightAttribute)
        if (sizeExpression && weightExpression) {
            variant =
                mapFiniteStringPair(
                    j,
                    sizeExpression,
                    'body',
                    weightExpression,
                    'regular',
                    (sizeValue, weightValue) => TEXT_VARIANTS[sizeValue]?.[weightValue],
                ) ?? undefined
        }
    }

    if (size === DYNAMIC && !variant) reasons.push('dynamic Text size')
    if (weight === DYNAMIC && !variant) reasons.push('dynamic Text weight')
    if (!hasVariant && (sizeAttribute || weightAttribute) && !variant && reasons.length === 0) {
        reasons.push('Text size and weight have no exact variant')
    }

    const renderName = asAttribute ? getStaticRenderName(j, asAttribute) : undefined
    if (asAttribute && !renderName) {
        reasons.push('dynamic Text as target')
    }
    if (asAttribute && renderAttribute) reasons.push('Text already has render prop')

    if (reasons.length > 0) {
        markManual(j, reporter, path, reasons)
        return true
    }
    if (!hasVariant && (sizeAttribute || weightAttribute)) {
        addVariant(j, openingElement, variant!)
    }
    if (asAttribute && renderName) {
        replaceAsWithRender(j, openingElement, asAttribute, renderName)
    }
    return (
        Boolean(!hasVariant && (sizeAttribute || weightAttribute)) ||
        Boolean(asAttribute && renderName)
    )
}

function transformHeadingElement(
    j: JSCodeshift,
    reporter: ManualReporter,
    path: ElementPath,
): boolean {
    if (hasManualMarker(path)) return false

    const openingElement = path.node.openingElement
    const duplicateAttributes = getDuplicateAttributes(openingElement, ['variant', 'render'])
    if (duplicateAttributes.length > 0) {
        markManual(
            j,
            reporter,
            path,
            duplicateAttributes.map((name) => 'duplicate Heading ' + name + ' props'),
        )
        return true
    }

    const variantAttribute = getAttribute(openingElement, 'variant')
    const renderAttribute = getAttribute(openingElement, 'render')
    const hasLegacyVariantProps = ['size', 'weight'].some((name) =>
        Boolean(getAttribute(openingElement, name)),
    )
    const hasLegacyRenderProps = ['level', 'size', 'weight'].some((name) =>
        Boolean(getAttribute(openingElement, name)),
    )

    if ((variantAttribute && hasLegacyVariantProps) || (renderAttribute && hasLegacyRenderProps)) {
        markManual(j, reporter, path, [
            'Heading mixes variant or render with legacy level, size, or weight props',
        ])
        return true
    }

    const reasons = []
    if (hasSpread(openingElement)) {
        reasons.push('spread props may supply or override text props')
    }
    for (const name of getDuplicateAttributes(openingElement, ['level', 'size', 'weight'])) {
        reasons.push('duplicate Heading ' + name + ' props')
    }

    const levelAttribute = getAttribute(openingElement, 'level')
    const sizeAttribute = getAttribute(openingElement, 'size')
    const weightAttribute = getAttribute(openingElement, 'weight')
    const level = levelAttribute ? readStaticLevel(levelAttribute) : undefined
    const size = readStaticString(sizeAttribute, 'default')
    const weight = readStaticString(weightAttribute, 'regular')

    if (!variantAttribute && level === undefined) reasons.push('dynamic Heading level')
    if (level === DYNAMIC) reasons.push('dynamic Heading level')
    let variant: string | MappedVariantExpression | undefined
    if (variantAttribute) {
        const namedVariant = readStaticString(variantAttribute, DYNAMIC)
        if (namedVariant === DYNAMIC) {
            variant =
                mapFiniteStringAttribute(
                    j,
                    variantAttribute,
                    '',
                    (value) => NAMED_HEADING_VARIANTS[value],
                ) ?? undefined
            if (!variant) reasons.push('dynamic Heading variant')
        } else {
            variant = NAMED_HEADING_VARIANTS[namedVariant]
            if (!variant) reasons.push('Heading variant has no Text equivalent')
        }
    } else if (renderAttribute) {
        reasons.push('Heading render requires a static variant')
    } else if (typeof level === 'number') {
        if (size !== DYNAMIC && weight !== DYNAMIC) {
            const fontSize = HEADING_SIZES[level]?.[size]
            const fontWeight = HEADING_WEIGHTS[weight]
            variant = HEADING_VARIANTS[fontSize + ':' + fontWeight]
        } else if (size === DYNAMIC && weight !== DYNAMIC && sizeAttribute) {
            variant =
                mapFiniteStringAttribute(j, sizeAttribute, 'default', (value) => {
                    const fontSize = HEADING_SIZES[level]?.[value]
                    return HEADING_VARIANTS[fontSize + ':' + HEADING_WEIGHTS[weight]]
                }) ?? undefined
        } else if (weight === DYNAMIC && size !== DYNAMIC && weightAttribute) {
            variant =
                mapFiniteStringAttribute(j, weightAttribute, 'regular', (value) => {
                    const fontSize = HEADING_SIZES[level]?.[size]
                    return HEADING_VARIANTS[fontSize + ':' + HEADING_WEIGHTS[value]]
                }) ?? undefined
        } else if (sizeAttribute && weightAttribute) {
            const sizeExpression = getAttributeExpression(sizeAttribute)
            const weightExpression = getAttributeExpression(weightAttribute)
            if (sizeExpression && weightExpression) {
                variant =
                    mapFiniteStringPair(
                        j,
                        sizeExpression,
                        'default',
                        weightExpression,
                        'regular',
                        (sizeValue, weightValue) => {
                            const fontSize = HEADING_SIZES[level]?.[sizeValue]
                            return HEADING_VARIANTS[fontSize + ':' + HEADING_WEIGHTS[weightValue]]
                        },
                    ) ?? undefined
            }
        }

        if (!variant && size !== DYNAMIC && weight !== DYNAMIC) {
            reasons.push('Heading metrics have no exact variant')
        }
    }

    if (size === DYNAMIC && !variant) reasons.push('dynamic Heading size')
    if (weight === DYNAMIC && !variant) reasons.push('dynamic Heading weight')

    if (reasons.length > 0) {
        markManual(j, reporter, path, reasons)
        return true
    }

    if (!variant) {
        markManual(j, reporter, path, ['Heading variant has no Text equivalent'])
        return true
    }

    replaceHeadingProps(
        j,
        openingElement,
        variant,
        typeof level === 'number' ? level : renderAttribute ? undefined : 1,
    )
    return true
}

function transform(file: FileInfo, api: API, options: Options): string | null {
    const failOnManual = Boolean(options.failOnManual ?? options['fail-on-manual'])
    const reporter = createManualReporter(api, getExistingManualReasons(file.source))
    if (!hasRootReactistImport(file.source)) {
        if (failOnManual && reporter.count > 0) {
            const noun = reporter.count === 1 ? 'migration remains' : 'migrations remain'
            throw new Error(reporter.count + ' manual ' + noun + ' in ' + file.path)
        }
        return null
    }

    const j = api.jscodeshift
    const root = j(file.source) as Root
    const textNames = getImportedNames(root, j, 'Text')
    const headingNames = getImportedNames(root, j, 'Heading')
    const namespaceNames = getNamespaceNames(root, j)
    let changed = markIndirectHeadingReferences(root, j, reporter, headingNames)
    changed = markRemovedTypeImports(root, j, reporter) || changed
    changed = markLegacyTextPropsReferences(root, j, reporter) || changed
    changed = markLegacyReexports(root, j, reporter) || changed
    changed = markNamespaceDestructuring(root, j, reporter, namespaceNames) || changed
    changed = markIndirectNamespaceReferences(root, j, reporter, namespaceNames) || changed
    changed = markNamespaceJSXReferences(root, j, reporter, namespaceNames) || changed

    root.find(j.JSXElement).forEach((path) => {
        const openingElement = path.node.openingElement
        if (openingElement.name.type !== 'JSXIdentifier') return

        const { name } = openingElement.name
        if (typeof name !== 'string') return
        if (textNames.has(name) && isImportedBinding(path, name, 'Text')) {
            changed = transformTextElement(j, reporter, path) || changed
        } else if (headingNames.has(name) && isImportedBinding(path, name, 'Heading')) {
            changed = transformHeadingElement(j, reporter, path) || changed
        }
    })

    changed = replaceMergedComponentImports(root, j) || changed

    if (failOnManual && reporter.count > 0) {
        const noun = reporter.count === 1 ? 'migration remains' : 'migrations remain'
        throw new Error(reporter.count + ' manual ' + noun + ' in ' + file.path)
    }

    return changed ? root.toSource({ quote: 'single' }) : null
}

export const parser = 'tsx'
export default transform
