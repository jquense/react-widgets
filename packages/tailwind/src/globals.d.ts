declare module 'tailwindcss/plugin' {
  export type ThemeFn = (value: string, defaultValue?: any) => any
  export type Component = Record<string, string | number | Component>

  export interface ApiOptions {
    respectPrefix?: boolean
    respectImportant?: boolean
  }

  export interface PluginApi {
    theme: ThemeFn
    addBase(styles: Record<string, any>): void
    addUtilities(styles: Record<string, any>, options?: ApiOptions): void
    addComponents<T extends Record<string, Components>>(
      components: T,
      options?: ApiOptions,
    ): void
  }

  export type Factory = (api: PluginApi) => void

  export default function plugin(
    fn: Factory,
    options?: { theme?: Record<string, any> },
  ): Function {}

  plugin.withOptions = (
    pluginFunction: (pluginOptions: any) => Factory,
    configFunction: (pluginOptions: any) => { theme?: Record<string, any> },
  ) => {}
}
