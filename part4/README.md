- [ ] - 4.21:
- [x] - Eliminar blog solo el usuario que que lo agregó. El token de la solicitud === token creador del blog
  - Si se intenta eliminar sin token o usuario correcto => Código de estado error
  - `blog.user` no contiene una cadena sino un objeto. Entonces se debe:

```js
if ( blog.user.toString() === userid.toString() ) ...
```
