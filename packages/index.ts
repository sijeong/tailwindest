import { createTools } from "./create.tools"
import type { GetVariants } from "./get.variants"
import type { Tailwindest } from "./tailwindest"

type Tailwind = Required<Tailwindest<{}, {}>>
const tw = createTools<Tailwind>()
export { createTools, type Tailwindest, type GetVariants, tw }
