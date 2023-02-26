// eslint-disable-next-line import/no-extraneous-dependencies
import { ClassNameList, NoStrictEntityMods, withNaming } from '@bem-react/classname'

export declare interface IStyles {
  [className: string]: string;
}

declare type ElemNameOrBlockModsType = NoStrictEntityMods | string | null;
declare type ElemModsOrBlockMixType = NoStrictEntityMods | ClassNameList | null;
declare type ElemMixType = ClassNameList;

const makeClassNameMaker = withNaming({ e: '-', m: '--', v: '_' })

export const makeCn = (scopeName: string, styles: IStyles) => {
  const makeClassName = makeClassNameMaker(scopeName)

  return (
    elemNameOrBlockMods?: any,
    elemModsOrBlockMix?: any,
    elemMix?: ElemMixType,
  ) => {
    const classNames = makeClassName(elemNameOrBlockMods, elemModsOrBlockMix, elemMix).split(' ')

    return classNames.reduce(
      (acc, className) => {
        const scopedClassName = styles[className]
        return scopedClassName ? `${acc} ${scopedClassName}` : acc
      },
      '',
    )
  }
}
