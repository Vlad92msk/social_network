import { FastAverageColor } from 'fast-average-color'
import { useEffect, useMemo, useState } from 'react'
import { invertColor } from '@shared/utils'

const fac = new FastAverageColor()

export const useGetAccentImageColor = (src: string, opacity?: number) => {
  const [color, setBcg] = useState<string>(null)
  const [hex, setHex] = useState<string>(null)
  useEffect(() => {
    fac.getColorAsync(src)
      .then(({ value, hex }) => {
        setBcg(`rgba(${value[0]}, ${value[1]}, ${value[2]}${opacity && `,${opacity}`})`)
        setHex(hex)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [opacity, src])

  return useMemo(() => (
    [color, hex, invertColor(hex)]
  ), [color, hex])
}
