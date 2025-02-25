import { describe, test } from "@jest/globals"
import { TypeEqual, expectType } from "ts-expect"
import { type GetVariants, type Tailwindest, createTools } from "../packages"
import { label } from "./label"

const tw = createTools<Tailwindest>()

const sizeRotary = tw.rotary({
    "2xl": {},
    xl: {},
    lg: {},
    md: {},
    sm: {},
    xs: {},
    "2xs": {},
    base: {},
})
type ExpectedSizeVariants = "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "2xs"

const colorRotary = tw.rotary({
    black: {},
    blue: {},
    green: {},
    purple: {},
    red: {},
    white: {},
    yellow: {},
    base: {},
})
type ExpectedColorVariants =
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "black"
    | "white"

describe(label.unit("GetVariants - rotary"), () => {
    test(label.case("infer variants type"), () => {
        expectType<
            TypeEqual<GetVariants<typeof sizeRotary>, ExpectedSizeVariants>
        >(true)

        expectType<
            TypeEqual<GetVariants<typeof colorRotary>, ExpectedColorVariants>
        >(true)
    })

    test(label.case("compose does not affect type inference result"), () => {
        sizeRotary.compose(
            {
                backgroundColor: "bg-amber-100",
            },
            {
                padding: "p-1",
            },
            {
                margin: "m-1",
            }
        )

        expectType<
            TypeEqual<GetVariants<typeof sizeRotary>, ExpectedSizeVariants>
        >(true)

        colorRotary.compose(
            {
                backgroundColor: "bg-amber-100",
            },
            {
                padding: "p-1",
            },
            {
                margin: "m-1",
            }
        )
        expectType<
            TypeEqual<GetVariants<typeof colorRotary>, ExpectedColorVariants>
        >(true)
    })
})

describe(label.unit("GetVariants - style"), () => {
    test(label.case("infer never"), () => {
        const baseWind = tw.style({})
        expectType<TypeEqual<GetVariants<typeof baseWind>, never>>(true)

        const baseWindStyle = baseWind.style
        expectType<TypeEqual<GetVariants<typeof baseWindStyle>, never>>(true)

        const baseWindComposedStyle = baseWind.compose({})
        expectType<TypeEqual<GetVariants<typeof baseWindComposedStyle>, never>>(
            true
        )
    })
})

describe(label.unit("GetVariants - variants"), () => {
    const totVariants = tw.variants({
        base: {},
        variants: {
            color: {
                black: {},
                blue: {},
                green: {},
                purple: {},
                red: {
                    display: "flex",
                    alignItems: "items-center",
                },
                white: {},
                yellow: {},
            },
            size: {
                "2xl": {},
                xl: {},
                lg: {},
                md: {},
                sm: {},
                xs: {},
                "2xs": {},
            },
        },
    })

    test("infer variants type", () => {
        expectType<
            TypeEqual<
                GetVariants<typeof totVariants>,
                {
                    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "2xs"
                    color?:
                        | "red"
                        | "yellow"
                        | "green"
                        | "blue"
                        | "purple"
                        | "black"
                        | "white"
                }
            >
        >(true)
    })

    test("infer variants type - by rotary", () => {
        expectType<
            TypeEqual<
                GetVariants<typeof totVariants>,
                {
                    size?: GetVariants<typeof sizeRotary>
                    color?: GetVariants<typeof colorRotary>
                }
            >
        >(true)
    })
})
