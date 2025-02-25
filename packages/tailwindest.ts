import type { TailwindestNestKey } from "./types/plugin.nest"
import type { TailwindWithOption } from "./types/tailwind.plugin"
import type {
    TailwindDefaultGlobalPlugOption,
    TailwindDefaultStylePlug,
    TailwindGlobalPlugOption,
    TailwindStylePlugOption,
} from "./types/tailwind.plugin.option"
import type { TailwindestTypeSet } from "./types/tailwindest"

type PlugOptionType = Record<string, unknown>

/**
 * @description Add custom property, defined at `tailwind.config.js`
 * @see {@link https://tailwindcss.com/docs/configuration tailwind configuration}
 * @example
 * // Plug customized type to createTools generic
 * type Custom = Tailwindest<
 *    {
 *        // Add color, sizing, screens global property
 *        color: "my-color1" | "my-color2"
 *        sizing: "0.25" | "0.5" | "0.75"
 *        screens: {
 *            // only one string union
 *            conditionA: "@do-this"
 *        }
 *    },
 *    {
 *        // Add "emoji", "my-shadow1" & "my-shadow2"
 *        listStyleType: "emoji"
 *        shadow: "my-shadow1" | "my-shadow2"
 *    }
 * >
 *
 * export const tw = createTools<Custom>()
 * @description Pick specific type
 * @example
 *
 * // ✅ Get Custom fontSize
 * type FontSize = Custom["fontSize"]
 */
export type Tailwindest<
    TailwindGlobal extends TailwindGlobalPlugOption = TailwindDefaultGlobalPlugOption,
    TailwindStyle extends TailwindStylePlugOption = TailwindDefaultStylePlug
> = TailwindGlobal["screens"] extends PlugOptionType
    ? TailwindStyle["aria"] extends PlugOptionType
        ? Partial<
              TailwindestTypeSet<
                  TailwindWithOption<TailwindGlobal, TailwindStyle>,
                  TailwindestNestKey<TailwindGlobal["screens"]>,
                  TailwindGlobal["screens"],
                  TailwindStyle["aria"]
              >
          >
        : Partial<
              TailwindestTypeSet<
                  TailwindWithOption<TailwindGlobal, TailwindStyle>,
                  TailwindestNestKey<TailwindGlobal["screens"]>,
                  TailwindGlobal["screens"]
              >
          >
    : Partial<
          TailwindestTypeSet<
              TailwindWithOption<TailwindGlobal, TailwindStyle>,
              TailwindestNestKey
          >
      >
