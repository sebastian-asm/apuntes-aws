# Apuntes de AWS para Desarrolladores Web

## Principales servicios de AWS

- **EC2**: encargado de administrar las instancias (VM, server, etc)
- **S3**: almacenamiento estático (ilimitado)
- **CloudFront**: servicio encargado de manejar los CDN (replicar los recursos estáticos en las diferentes regiones)
- **RDS**: administrar bases de datos relacionales
- **Elastic Beanstalk**: administrar otros servicios de forma automática, dependiendo de las reglas que se especifiquen
- **AWS Certificate Manage**: generar certificados SSL
- **AIM**: permite administrar los accesos de usuarios, grupos, roles, etc

## EC2 (Elastic Compute Cloud)

- T2, T3, T3a, etc: son diferentes familias de rendimiento general en cuanto a CPU y RAM, por ejemplo para un servidor web.
- Direcciones IP elásticas: permite asignar una IP pública y fija a una instancia
- AMI: crear una imagen a parir de una instancia EC2 (tomando todas su configuraciones como base)

Instancias:

- Bajo demanda: son aquellas que cobrarán por su uso (horas consumidas)
- Spot: más económicas pero en base a subastas (no recomendables para principiantes)
- Reservadas: tiene un costo más económico pero comprometiendose a un tiempo mínimo de permanencia, por ejemplo un año

Para conectarse a una instancia con Ubuntu a través de su IP pública y utilizando SSH:

`ssh {usuario_root}@{ip_publica} -i {path_archivo_pem}`

Ejemplo: `ssh ubunto@18.117.122.96 -i ./Downloads/archivo.pem`

Comandos básicos en Ubuntu:

- `sudo su`: cambiar al usuario administrador
- `apt-get update`: preparar las actualizaciones disponibles de los repositorios
- `apt-get upgrade`: aplicar las actualizaciones
- `sudo apt install nginx`: instalación de nginx
  - `service nginx status`: verificar el estado del servicio

Guía: [Ampliar el espacio de disco duro en ubuntu (AWS EC2)](https://codigoencasa.com/ampliar-el-espacio-de-disco-duro-en-ubuntu-aws-ec2/)

**LoadBalancer (balanceador DNS)**: distribuir la carga de peticiones en diferentes instancias, agregar instancias de forma manual al grupo que conecta con el balanceador o de forma automatica a medida que se vayan necesitando más instancias.

**AutoScaling**: escalar automáticamente nuestra infraestructura (agregando o quitando instancias, estableciendo las mínimas y las máximas).

- _"Valor de destino"_: uso de la CPU
- _"Las instancias necesitan"_: tiempo que la CPU se mantien por arriba del valor de destino, esto hará que se apliquen las reglas para agregar instancia o eliminar cuando el uso de CPU baja

Realizar pruebas de carga: [Vegeta](https://github.com/tsenart/vegeta)

## S3 (Simple Storage Service)

Es un servicio que permite escalabilidad, disponibilidad de datos, seguridad y rendimiento.

Servicios:

- Bucket: contenedores de objetos (archivos)
- Hosting: servicio web para sitio estáticos

## CloudFront (CDN)

El CDN puede ayudar a mejorar el rendimiento del sitio web aumentado su disponibilidad rápidamente, esto se hace replicando los archivos del sitio en diferentes servidores alrededor del mundo.

## AIM

Existen diferentes tipos de usuarios: con acceso a la consola o los usuarios programáticos (que representan una API KEY mediante una app), a estos se les pueden asignar accesos únicamente a aquellos servicios que se van a consumir mediante las políticias y ordenar a través de grupos.

# RDS

Este servicio permite configurar, operar y escalar bases de relaciones como: Postgres, MySQL, MariaDB, SQL Server entre otros. Entre algunas de las opciones, la de _Acceso público_ indica que se puede acceder a la db desde algún gestor como por ejemplo Workbench.

Además, se debe habilitar el acceso creando una nueva regla en el grupo de seguridad _Inbound_ indicando el **tipo**, por ejemplo el protocolo de Postgres, y luego el **origen**, o sea, las IPs que se podrán conectar a la db.

- Escalamiento horizontal: es una forma de mejorar el rendimiento y la disponibilidad de una app al agregar más servidores que trabajan en conjunto como un solo sistema
- Escalamiento vertical: es una forma de mejorar el rendimiento y la disponibilidad de una aplicación al aumentar los recursos de un solo servidor, como la memoria, la CPU o el almacenamiento

## Elastic Beanstalk

Esta infraestructura nos permite un historial de cambios para hacer un rollback en caso de tener algún problema con un despliegue actual. Para agregar variables de entorno, se hace desde la opción de _configuración_, luego en _software_ y editar.
