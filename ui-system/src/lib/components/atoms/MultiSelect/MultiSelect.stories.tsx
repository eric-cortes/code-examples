import React from 'react'
import { MultiSelect, MultiSelectProps, MULTISELECT_VARIANT } from './MultiSelect'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof MultiSelect> = {
  title: 'Atoms/MultiSelect',
  component: MultiSelect,
  argTypes: {
    label: { control: 'text' },
    variant: objectValuesToControls(MULTISELECT_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof MultiSelect> = (args: MultiSelectProps) => <MultiSelect {...args} />

const dummyData = [
  {
    id: '5f993e2ec23db5740932bf6f',
    name: 'Item 1',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf70',
    name: 'Item 2',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf71',
    name: 'Item 3',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf72',
    name: 'Item 4',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf73',
    name: 'Item 5',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
]

const dummyDataSelected = [
  {
    id: '5f993e2ec23db5740932bf6f',
    name: 'Verkehrszeichen verunreinigt',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf71',
    name: 'Verkehrszeichen verblasst',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf73',
    name: 'keine Mängel',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
]

export const Default = Template.bind({})
Default.args = {
  label: 'MultiSelect',
  variant: 'DEFAULT',
  options: dummyData,
  selectedOptions: dummyDataSelected,
}
