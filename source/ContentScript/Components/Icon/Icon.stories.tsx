import { Story } from '@storybook/react'
import React from 'react'

import { Flex } from '../Flex/Flex'
import { EvenGrid } from '../Grid/EvenGrid'
import { ToolTip } from '../Tooltip/ToolTip'
import { Icon, IconNames, IconPaths, IconProps } from './Icon'

export default {
  component: Icon,
  title: 'Components/Icon',
}

export const AllIcons: Story<IconProps> = args => (
  <EvenGrid>
    {Object.keys(IconPaths).map((name, index) => (
      <ToolTip key={index} content={<span>{name}</span>}>
        <Icon {...args} name={name as IconNames} />
      </ToolTip>
    ))}
  </EvenGrid>
)

AllIcons.args = {
  height: 30,
  highlight: 'tertiaryDark',
  width: 30,
}

const IconTemplate: Story<IconProps> = ({ name, ...args }) => (
  <Flex column center>
    <div>{name}</div>
    <Icon {...args} name={name} />
  </Flex>
)

export const NamedIcon = IconTemplate.bind({})

NamedIcon.args = {
  height: 30,
  highlight: 'tertiary',
  name: 'joystick',
  width: 30,
}
