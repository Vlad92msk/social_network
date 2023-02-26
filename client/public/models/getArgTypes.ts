// eslint-disable-next-line @typescript-eslint/ban-types
export type GetArgTypes<F extends Function> = F extends (args?: infer A) => any ? A : never;
