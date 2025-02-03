import React from 'react'
import { Select, SelectProps, SELECT_VARIANT } from './Select'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    label: { control: 'text' },
    variant: objectValuesToControls(SELECT_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof Select> = (args: SelectProps) => <Select {...args} />

const dummyData = [
  {
    id: '5f993e2ec23db5740932bf6f',
    name: 'Arbeiterorientiert (bevorzugt eine fair verteilte Abholung unter den Fahrern) One',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf70',
    name: 'Arbeiterorientiert (bevorzugt eine fair verteilte Abholung unter den Fahrern) Two',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf71',
    name: 'Arbeiterorientiert (bevorzugt eine fair verteilte Abholung unter den Fahrern) Three',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf72',
    name: 'Arbeiterorientiert (bevorzugt eine fair verteilte Abholung unter den Fahrern) Four',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
  {
    id: '5f993e30c23db5740932bf73',
    name: 'Arbeiterorientiert (bevorzugt eine fair verteilte Abholung unter den Fahrern) Five',
    objectModelId: '5f993e2dc23db5740932bf6e',
  },
]

const generateTimeOptions = (): { id: string; value: string }[] => {
  const options: { id: string; value: string }[] = []
  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, '0')
    const timeString = `${hourString}:00`
    options.push({ id: hourString, value: timeString })
  }
  return options
}

const test = generateTimeOptions()

export const Default = Template.bind({})
Default.args = {
  label: 'Select',
  variant: 'DEFAULT',
  options: dummyData,
  id: '',
  topPull: false,
}
