## API

Siempre viene en XML, normalmente se publica 1 al día (a excepcion de los domingos)

`https://boe.es/diario_boe/xml.php?id=[PUB]-[I]-[FECHA]`

- [PUB]. Tipo de boletín. Siempre es BOE
- [I]. Tipo de item. Siempre es S ya que se trata de un sumario.
- [FECHA]. Fecha de la publicación en formato AAAAMMDD

La estructura es la siguiente

```
<sumario>
  <meta>
    <pub>BOE</pub>
    <anno>       strings(2020)                            </anno>
    <fecha>      strings(30/04/2020)                      </fecha>
    <fechaInv>   strings(2020/04/30)                      </fechaInv>
    <fechaAnt>   strings(29/04/2020)                      </fechaAnt>
    <fechaAntAnt>strings(28/04/2020)                      </fechaAntAnt>
    <fechaSig>   strings(01/05/2020)                      </fechaSig>
    <fechaPub>   strings(jueves 30 de abril de 2020)      </fechaPub>
    <pubDate>    strings(Thu, 30 Apr 2020 00:00:00 +0200) </pubDate>
  </meta>
  <diario nbo="number"> --> representa el numero de boletin, empieza en 1 cada año y se suma por cada boletín
    <sumario_nbo id="[PUB]-[I]-[AAAA]-[NNN]">
      <urlPfd> es una url con informacon del sumario <urlPdf> *de momento la ignoramos*
    </sumario_nbo>
    <seccion num="string" nombre="string">
      <departamento nombre="string" etq="">
      <n-departamentos>
    </seccion>
  </diario>
  <n-diarios>
</sumario>
```

# Metadatos

| Elemento | Descripción |
| -------- | ------------ |
| pub      | Identifica el tipo de boletín oficial. En este caso, su valor siempre es BOE|
| fecha    | Fecha en la que se ha publicado el boletín oficial. El formato es dd/mm/yyyy |
| fechaAnt | Fecha en la que ha publicado el boletín oficial anterior. El formato es dd/mm/yyyy |
| fechaSig | Fecha en la que se ha publicado el boletín oficial siguiente. El formato es dd/mm/yyyy. En el caso de que se solicite el boletín del día actual, este elemento estará vacío y se completará cuando se produzca la publicación del boletín del día siguiente |

# Diarios

| Elemento          | Descripción                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| sumario_nbo       | Información referente al documento pdf que contiene el sumario correspondiente al boletín |
| Lista de seccion. | Datos relativos a las distintas secciones que componen el diario                          |

# Sumario NBO

El elemento <sumbario_nbo> se recoge la información del documento PDF en el que aparece el sumario que se ha publicado junto con un boletín en una determinada fecha. El ID del sumario_nbo tienen el siguiente formato [PUB]-[I]-[AAAA]-[NNN] donde:
- [PUB]  Tipo de boletín. Siempre es BOE.
- [I]    Tipo de item. Siempre es S ya que se trata de un sumario.
- [AAAA] Año de publicación del boletín.
- [NNN]  Número del boletín junto con el que se publica.


# Sección

El elemento <seccion> se utiliza para organizar las diferentes disposiciones y anuncios que se publican en un boletín. Las secciones de un boletín son:
- Sección 1. Disposiciones Generales
- Sección 2. Autoridades y Personal.
  - Sección 2A. Nombramientos situaciones e incidencias
  - Sección 2B. Oposiciones y concursos
- Sección 3. Otras secciones
- Sección 4. Administración de Justicia
- Sección 5. Anuncios.
  - **Sección 5A. Licitaciones públicas y adjudicaciones**
  - Sección 5B. Otros anuncios oficiales
  - Sección 5C. Anuncios particulares
  - Sección T. Tribunal constitucional

Aquí nos interesa en principio la sección **5A** que son los contratos de fondos publicos a empresas a traves de los departamentos del estado.

##### En las secciones 1,2 y 3 
```
<departamento nombre="" etq="">
    <epigrafe nombre="">
        <item id="" control="">
            <titulo></titulo>
            <urlPdf szBytes="" szKBytes="" numPag=""></urlPdf>
            <urlHtm></urlHtm>
            <urlXml></urlXml>
        </item>
    </epigrafe>
</departamento>
```
##### En las secciones 4 y 5
```
<departamento nombre="" etq="">
  <item id="">
      <titulo></titulo>
      <urlPdf szBytes="" szKBytes="" numPag=""></urlPdf>
      <urlHtm></urlHtm>
      <urlXml></urlXml>
  </item>
  <n-items>
</departamento>
```
### Attributos y elementos

|Atributo |  Descripción|
| -- | -- |
| num |Identifica el número de la sección|
| nombre |Nombre descriptivo de la sección|


| Elemento | Descripción |
| -- | -- |
| Lista de <epigrafe> | Lista de epígrafes en los que están agrupadas las disposiciones correspondientes al departamento. Para las secciones 1, 2 y 3|
| Lista de <item> | Lista de disposiciones correspondientes a la sección. Para las secciones 4 y 5. |


# Item

El elemento <item> recoge la información de la disposición o anuncio publicado en el boletín correspondiente a una fecha. Estos elementos se pueden obtener en 3 formatos:

 - Documento en pdf. desde 2009 estan firmados digitalmente
 - Documento en html. 
 - Documento en xml. (tiene más informacion)

Todos los items **tienen un atributo id**. Este identificador coincide con el valor del CVE (Código de Verificación Electrónica) para pillar los pdf oficiales desde 2009

El id tiene el formato [PUB]-[I]-[AAAA]-[NNNNNN] donde:
- [PUB]. Tipo de boletín. Siempre es BOE.
-  [I]. Tipo de item.
  - A – Se trata de una disposición
   B – Se trata de un anuncio
- [AAAA]. Año de publicación
- [NNNNNN]. Número de la disposición o anuncio.

# Estructura de un item

