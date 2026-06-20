import * as React from 'react'

const containerStyle: React.CSSProperties = {
    alignItems: 'center',
    display: 'inline-flex',
    gap: '4px',
}

const badgeStyle: React.CSSProperties = {
    alignItems: 'center',
    border: '1px solid currentColor',
    borderRadius: '3px',
    boxSizing: 'border-box',
    display: 'inline-flex',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '14px',
    minHeight: '20px',
    padding: '2px 6px',
    whiteSpace: 'nowrap',
}

interface BadgeProps {
    label: string
    styles?: React.CSSProperties
}

/** A toolbar badge used for the Storybook frame */
function Badge({ label, styles }: BadgeProps) {
    return <span style={{ ...badgeStyle, ...styles }}>{label}</span>
}

function BadgeGroup({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div style={containerStyle} {...props}>
            {children}
        </div>
    )
}

export { Badge, BadgeGroup }
export type { BadgeProps }
