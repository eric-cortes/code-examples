import React from 'react'
import { FilterChip, FilterChipProps, FILTERCHIP_VARIANT } from './FilterChip'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof FilterChip> = {
  title: 'Atoms/FilterChip',
  component: FilterChip,
  argTypes: {
    label: { control: 'text' },
    variant: objectValuesToControls(FILTERCHIP_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof FilterChip> = (args: FilterChipProps) => <FilterChip {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'FilterChip',
  variant: 'DEFAULT',
}
