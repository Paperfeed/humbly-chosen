import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react'
import React from 'react'

import { Button, ButtonProps } from './Button'

export default {
  component: Button,
  title: 'Components/Button',
}

export const Default: Story<ButtonProps> = args => (
  <Button {...args}>Hello</Button>
)

Default.args = {
  onClick: action('clicked'),
}
