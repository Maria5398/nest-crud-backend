import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest(); /* captura datos de lla peitccion y extrae los datos  y si hay datos este devuelve el dato */
    const user = request.user;

    return data ? user && user[data] : user;
  },
);