4.19: Expansión de la Lista de Blogs, paso 7
Modifica la adición de nuevos blogs para que solo sea posible si se envía un token válido con la solicitud HTTP POST. El usuario identificado por el token se designa como el creador del blog.

4.20\*: Expansión de la Lista de Blogs, paso 8
Este ejemplo de la parte 4 muestra cómo tomar el token del encabezado con la función auxiliar getTokenFrom.

Si usaste la misma solución, refactoriza para llevar el token a un middleware. El middleware debe tomar el token del encabezado Authorization y debe asignarlo al campo token del objeto request.

En otras palabras, si registras este middleware en el archivo app.js antes de todas las rutas

app.use(middleware.tokenExtractor)copy
Las rutas pueden acceder al token con request.token:

blogsRouter.post('/', async (request, response) => {
// ..
const decodedToken = jwt.verify(request.token, process.env.SECRET)
// ..
})copy
Recuerda que una función middleware es una función con tres parámetros, que al final llama al último parámetro next para mover el control al siguiente middleware:

const tokenExtractor = (request, response, next) => {
// código que extrae el token

next()
}copy
4.21\*: Expansión de la Lista de Blogs, paso 9
Cambia la operación de eliminar blogs para que el blog solo pueda ser eliminado por el usuario que lo agregó. Por lo tanto, eliminar un blog solo es posible si el token enviado con la solicitud es el mismo que el del creador del blog.

Si se intenta eliminar un blog sin un token o por un usuario incorrecto, la operación debe devolver un código de estado adecuado.

Ten en cuenta que si obtienes un blog de la base de datos,

const blog = await Blog.findById(...)copy
el campo blog.user no contiene una cadena, sino un objeto. Entonces, si deseas comparar el ID del objeto obtenido de la base de datos y un ID de cadena, la operación de comparación normal no funciona. El ID obtenido de la base de datos debe primero convertirse en una cadena.

if ( blog.user.toString() === userid.toString() ) ...copy
4.22\*: Expansión de la Lista de Blogs, paso 10
Tanto la creación de un nuevo blog como su eliminación necesitan averiguar la identidad del usuario que está realizando la operación. El middleware tokenExtractor que hicimos en el ejercicio 4.20 ayuda, pero los controladores de las operaciones post y delete necesitan averiguar quién es el usuario que posee un token específico.

Ahora cree un nuevo middleware userExtractor, que encuentre al usuario y lo guarde en el objeto de solicitud. Cuando registras el middleware en app.js

app.use(middleware.userExtractor)copy
el usuario se guardara en el campo request.user:

blogsRouter.post('/', async (request, response) => {
// obtén usuario desde el objeto de solicitud
const user = request.user
// ..
})

blogsRouter.delete('/:id', async (request, response) => {
// obtén usuario desde el objeto de solicitud
const user = request.user
// ..
})copy
Ten en cuenta que es posible registrar un middleware solo para un conjunto específico de rutas. Entonces, en lugar de usar userExtractor con todas las rutas,

const middleware = require('../utils/middleware');
// ...

// usa el middleware en todas las rutas
app.use(middleware.userExtractor)

app.use('/api/blogs', blogsRouter)  
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)copy
podríamos registrarlo para que solo se ejecute con las rutas de /api/blogs:

const middleware = require('../utils/middleware');
// ...

// usa el middleware solo en las rutas de api/blogs
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)copy
Como puede verse, esto sucede al encadenarse múltiples middlewares como argumentos de la función use. También sería posible registrar un middleware solo para una operación específica:

const middleware = require('../utils/middleware');
// ...

router.post('/', middleware.userExtractor, async (request, response) => {
// ...
}copy
4.23\*: Expansión de la Lista de Blogs, paso 11
Después de agregar la autenticación basada en token, las pruebas para agregar un nuevo blog se rompieron. Arréglalas. También escribe una nueva prueba para asegurarte de que la adición de un blog falla con el código de estado adecuado 401 Unauthorized si no se proporciona un token.

Esto probablemente sea útil al hacer la corrección.

Este es el último ejercicio de esta parte del curso y es hora de enviar tu código a GitHub y marcar todos sus ejercicios terminados en el sistema de envío de ejercicios.
