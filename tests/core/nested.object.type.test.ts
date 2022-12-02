import { describe, test } from "@jest/globals"
import { TypeEqual, expectType } from "ts-expect"
import { Tailwindest } from "../../packages"
import { NestedObject } from "../../packages/core/nested.object.type"
import { label } from "../label"

describe(label.unit("Type NestedObject"), () => {
    const nestedObject = {
        a: {
            b: {
                c: { d: "d" },
            },
        },
    }
    const tailwindStyle = {
        display: "flex",
        alignItems: "items-center",
    } as const

    test(label.case("object infered as NestedObject"), () => {
        expectType<NestedObject>(nestedObject)
        expectType<NestedObject>(tailwindStyle)
    })

    test(
        label.case("const asserted style props infered as Tailwindest"),
        () => {
            expectType<Tailwindest>(tailwindStyle)
        }
    )

    test(
        label.case("Tailwindest extends NestedObject true, reverse false"),
        () => {
            expectType<
                TypeEqual<
                    typeof tailwindStyle extends NestedObject ? true : false,
                    typeof nestedObject extends NestedObject ? true : false
                >
            >(true)

            expectType<
                TypeEqual<
                    typeof nestedObject extends Tailwindest ? true : false,
                    true
                >
            >(false)

            expectType<
                TypeEqual<NestedObject extends Tailwindest ? true : false, true>
            >(true)
        }
    )
})
