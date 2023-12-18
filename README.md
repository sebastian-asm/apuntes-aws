# Apuntes de AWS para Desarrolladores Web

## Principales servicios de AWS

- **EC2**: encargado de administrar las instancias (VM, server, etc)
- **RDS**: administrar bases de datos relacionales
- **S3**: almacenamiento estático
- **CloudFront**: servicio encargado de manejar los CDN (replicar los recursos estáticos en las diferentes regiones)
- **Elastic Beanstalk**: administrar otros servicios de forma automática, dependiendo de las reglas que se especifiquen

## EC2

- T2, T3, T3a, etc: son diferentes familias de rendimiento general en cuanto a CPU y RAM, por ejemplo para un servidor web.
- Direcciones IP elásticas: permite asignar una IP pública y fija a una instancia
- AMI: crear una imagen a parir de una instancia EC2 (tomando todas su configuraciones como base)

Instancias:

- Bajo demanda: son aquellas que cobrarán por su uso (horas consumidas)
- Spot: más económicas pero en base a subastas (no recomendables para principiantes)
- Reservadas: tiene un costo más económico pero comprometiendose a un tiempo mínimo de permanencia, por ejemplo un año

Para conectarse a una instancia con Ubuntu a través de su IP pública y utilizando SSH:

```
ssh {usuario_root}@{ip_publica} -i {path_archivo_pem}

Ejemplo: ssh ubunto@18.117.122.96 -i ./Downloads/archivo.pem
```

Comandos básicos en Ubuntu:

- `sudo su`: cambiar al usuario administrador
- `apt-get update`: preparar las actualizaciones disponibles de los repositorios
- `apt-get upgrade`: aplicar las actualizaciones
- `sudo apt install nginx`: instalación de nginx
  - `service nginx status`: verificar el estado del servicio

Guía: [Ampliar el espacio de disco duro en ubuntu (AWS EC2)](https://codigoencasa.com/ampliar-el-espacio-de-disco-duro-en-ubuntu-aws-ec2/)

**LoadBalancer (balanceador DNS)**: distribuir la carga de peticiones en diferentes instancias, agregar instancias de forma manual al grupo que conecta con el balanceador o de forma automatica a medida que se vayan necesitando más instancias.

**AutoScaling**: escalar automáticamente nuestra infraestructura (agregando o quitando instancias).

- _"Valor de destino"_: uso de la CPU
- _"Las instancias necesitan"_: tiempo que la CPU se mantien por arriba del valor de destino, esto hará que se apliquen las reglas para agregar instancia o eliminar cuando el uso de CPU baja

Realizar pruebas de carga: [Vegeta](https://github.com/tsenart/vegeta)
