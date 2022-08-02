import { Season } from '@prisma/client'
import { IconType } from 'react-icons'
import {
  GiDandelionFlower,
  GiSun,
  GiMapleLeaf,
  GiSnowflake1,
} from 'react-icons/gi'

export const seasons: {
  [key in keyof typeof Season]: { Icon: IconType; name: string }
} = {
  SPRING: { Icon: GiDandelionFlower, name: 'Spring' },
  SUMMER: { Icon: GiSun, name: 'Summer' },
  FALL: { Icon: GiMapleLeaf, name: 'Fall' },
  WINTER: { Icon: GiSnowflake1, name: 'Winter' },
}
