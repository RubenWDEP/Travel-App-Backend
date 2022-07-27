# Viajes-Recomendados

Esta API tiene el objetivo de servir un portal donde los usuarios puedan recomendar y comentar viajes y lugares a los que viajar. La API se puede consumir como usuario anónimo o como usuario regsitrado. 

--Usuario anónimo-----------------------------------------------------------------------------------------------
+ Se puede buscar recomendaciones por diferentes campos ( lugar y categoría)
+ Se puede ordenar los resultados de búsqueda por votos
+ Se puede leer los detalles de una recomendación.
    Cuándo se leen los detalles se lee todo el contenido del anuncio ( título, categoría, lugar, entradilla y texto)
+ Se puede hacer login introduciendo email y contraseña. Para ello hay que hacer la petición de tipo post al endpoint "localhost:3000/login", incluyendo el email y la contraseña en el body.


Ejemplo:

--Request Headers--

Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTM5MTEsImV4cCI6MTY1MTI0MDMxMX0.Ml1mybrGi94KnTiuXyvX_bl-9s5RxuyoFlsiPzaW1ik

--Body raw (json)--

{
  "email": "abc@ejemplo.com",
  "password": "abc12345"
}



+ Se puede registrar el usuario. Para ello hay que hacer la petición tipo post al endpoint "localhost:3000/register", incluyendo email y contraseña en el body. En el registro, la API verifica los datos que se le envían en la petición para que cumplan con el formato requerido.



Ejemplo: 

--Body raw (json)--

{
  "email": "abc@ejemplo.com",
  "password": "abc12345"
}


--Usuario--------------------------------------------------------------------------------------------------------

Una vez registrado, el usuario puede: 

+ Publicar recomendaciones (título, categoría, lugar, entradilla, texto, foto). Todos los campos son obligatorios excepto la foto. Para ello hay que hacer la petición tipo post al endpoint "localhost:3000/publish". La información requerida para realizar la publicación debe ser enviada a través del objeto FormData. Es necesario incluir en los headers el token generado en Login.  Los datos enviados son verificados para que cumplan con las restricciones establecidas a cada clave.

Ejemplo: 

--Request Headers--

Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTM5MTEsImV4cCI6MTY1MTI0MDMxMX0.Ml1mybrGi94KnTiuXyvX_bl-9s5RxuyoFlsiPzaW1ik

--Bodyform-data--

titulo: Vacaciones en la nieve

categoria: Viaje a lugares con nieve

lugar: Un lugar donde hay nieve

entradilla: Si te gusta el snowboard este es tu sitio

texto: Magnifico lugar para practicar deportes extremos como el snowboard entre otros. Buen lugar para pasar tiempo con la familia.

foto: (Opcional)


+ Votar recomendaciones de otros usuarios. Para votar las recomendaciones de otros usuarios hay que hacer la petición post al endpoint "localhost:3000/raterecommendation". Es necesario incluir en los headers el token generado en Login. Los valores disponibles para votar una recomendacion son: "ceroestrellas", "unaestrella", "dosestrellas", "tresestrellas", "cuatroestrellas" y "cincoestrellas". 

Ejemplo: 

--Request Headers--

Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTExNTM5MTEsImV4cCI6MTY1MTI0MDMxMX0.Ml1mybrGi94KnTiuXyvX_bl-9s5RxuyoFlsiPzaW1ik

--Body raw (json)--

{
  "id_rec": 3,
  "rateValue": "dosestrellas"
}


Para esta API hemos necesitado los siguientes Módulos de Node:

+ express 
+ morgan
+ jsonwebtoken
+ joi
+ sharp
+ bcrypt
+ path
+ nanoid
