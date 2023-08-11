import * as React from 'react'
import {
    Combobox,
    ComboboxItem,
    ComboboxPopover,
    useComboboxStore,
    SelectList,
    SelectItem,
    useSelectStore,
} from '@ariakit/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import styles from './combobox.module.css'
import { TextField } from '../text-field'
import { Box } from '../box'

export default {
    title: 'Design System/Combobox',
}

const team = [
    {
        name: 'Craig',
    },
    {
        name: 'Ernesto',
    },
    {
        name: 'Frankie',
    },
    {
        name: 'Paul',
    },
    {
        name: 'Pedro',
    },
    {
        name: 'Ricardo',
    },
    {
        name: 'Seva',
    },
    {
        name: 'Natalie',
    },
    {
        name: 'Valente',
    },
    {
        name: 'Scott',
    },
    {
        name: 'Paweł',
    },
    {
        name: 'Francesca',
    },
    {
        name: 'Rui',
    },
]

export function ComboboxStory() {
    const [searchValue, setSearchValue] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const [isOpen, setOpen] = useState(false)

    const matches = useMemo(
        () =>
            team.filter((member) =>
                member.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
            ),
        [searchValue],
    )

    const onClose = useCallback(
        function onClose(open: boolean) {
            if (!open) {
                setSearchValue(selectedValue)
            }
            setOpen(open)
        },
        [setSearchValue, selectedValue],
    )

    const combobox = useComboboxStore({
        value: searchValue,
        setValue: setSearchValue,
        setOpen: onClose,
    })

    const onSelect = useCallback(
        (value: string) => {
            setSearchValue(value)
            setSelectedValue(value)
        },
        [setSearchValue, setSelectedValue],
    )

    const select = useSelectStore({
        combobox,
        value: selectedValue,
        setValue: onSelect,
        defaultActiveId: selectedValue ?? undefined,
    })

    const { move } = select

    useEffect(
        function focusItemOnSearch() {
            if (searchValue) {
                move(matches[0]?.name)
            }
        },
        [searchValue, matches, move],
    )

    useEffect(
        function focusItemOnOpen() {
            if (isOpen) {
                move(selectedValue)
            }
        },
        [isOpen, selectedValue, move],
    )

    return (
        <div className="wrapper">
            <Box maxWidth="small">
                <Combobox
                    store={combobox}
                    placeholder="Select a developer"
                    className="combobox"
                    render={<TextField label="Developer" />}
                />
            </Box>
            <ComboboxPopover
                store={combobox}
                gutter={8}
                sameWidth
                className={styles.popover}
                render={<SelectList store={select} />}
            >
                {team.map((value) => (
                    <SelectItem
                        render={<ComboboxItem />}
                        id={value.name}
                        key={value.name}
                        value={value.name}
                        className={styles.comboboxItem}
                    />
                ))}

                {/* {!matches.length && <div className="no-results">No results found</div>} */}
            </ComboboxPopover>
        </div>
    )
}
