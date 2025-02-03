import React from 'react'
import { Modal, ModalProps, MODAL_VARIANT } from './Modal'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof Modal> = {
  title: 'Atoms/Modal',
  component: Modal,
  argTypes: {
    variant: objectValuesToControls(MODAL_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof Modal> = (args: ModalProps) => <Modal {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'DEFAULT',
  isDisabled: false,
  width: '',
  height: '',
  customClasses: '',
}
