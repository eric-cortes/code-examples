import React from 'react'
import { Radio, RadioProps, RADIO_VARIANT } from './Radio'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  argTypes: {
    placeholder: { control: 'text' },
    variant: objectValuesToControls(RADIO_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof Radio> = (args: RadioProps) => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Radio',
  variant: 'DEFAULT',
}
