type TailwindGridAutoFlowVarients =
    | "row"
    | "col"
    | "dense"
    | "row-dense"
    | "col-dense"
type TailwindGridAutoFlow = `grid-flow-${TailwindGridAutoFlowVarients}`
export type TailwindGridAutoFlowType = {
    /**
     *@note Utilities for controlling how elements in a grid are auto-placed.
     *@docs [grid-auto-flow](https://tailwindcss.com/docs/grid-auto-flow)
     */
    gridAutoFlow: TailwindGridAutoFlow
}
