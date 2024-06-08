export const load = () => {
  return {
    hello: "hola"
  }
}

export type Load = ReturnType<typeof load>;