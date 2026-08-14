import fs from 'fs';

const rawData = `Espaa;Comunidad de Madrid;19:00-21:00;Madrid;28028;GA Despertar;Avenida de los Toreros N45 - 1;Lunes;Madrid;Presencial;(616) 071514;gagrupodespertar45@gmail.com;;
Espaa;Comunidad de Madrid;19:00-21:00;Madrid;28028;GA Despertar;Avenida de los Toreros N45 - 1;Mircoles;Madrid;Presencial;(616) 071514;gagrupodespertar45@gmail.com;;
Espaa;Islas Canarias;18:45-20:15;Las Palmas de Gran Canaria;35013;GA La Paz;C/ Tormento n 2;Lunes;Las Palmas;Presencial;(613) 764700;lapaz@jugadoresanonimos.org;;
Espaa;Castilla-La Mancha;21:00-22:30;Albacete;02005;GA Albacete;C/ Juan de Toledo n 35;Jueves;Albacete;Presencial;(636) 662639;albacete@jugadoresanonimos.org;;
Espaa;Castilla-La Mancha;21:00-22:30;Albacete;02005;GA Albacete;C/ Juan de Toledo n 35;Sbado;Albacete;Presencial;(636) 662639;albacete@jugadoresanonimos.org;;
Espaa;Regin de Murcia;19:30-21:00;Cartagena;30205;GA Cartagena;C/ San Fulgencio n 3 (Barrio Peral);Jueves;Murcia;Presencial;(623) 280453;cartagena@jugadoresanonimos.org;;
Espaa;Andaluca;18:30-20:00;Sevilla;41018;GA Esperanza;C/ Santo Rey n 24;Viernes;Sevilla;Presencial;(744) 642896;esperanza@jugadoresanonimos.org;;
Espaa;Andaluca;19:00-20:30;Puerto de Santa Mara;11500;GA IlusionI;C/ Pintor Enrique Ochoa s/n;Jueves;Cdiz;Presencial;(641) 342501;ilusion1puertosantamaria@jugadoresanonimos.org;;
Espaa;Andaluca;19:30-21:00;Cdiz;11011;GA Ilusin II;C/ Hroes de La Aviacin Espaola S/N;Jueves;Cdiz;Presencial;(690) 184383;ilusion2cadiz@jugadoresanonimos.org;;
Espaa;Euskadi;19:00-21:00;Bilbao;48012;GA Inmaculada;Calle Zancoeta n 1;Martes;Vizcaya;Presencial;(676) 895313;inmaculada@jugadoresanonimos.org;;
Espaa;Euskadi;18:30-20:00;Hernani;20120;GA Hernani;29 Sandiusterri bajo;Martes;Guipzcoa;Presencial;(636) 361453;jugadoresanonimoshernani@gmail.com;;
Espaa;Comunidad de Madrid;18:00-19:30;Mstoles;28933;GA Mostoles;C/ Pintor Mir 3;Viernes;Madrid;Presencial;(616) 071514;gamostolesmadrid@gmail.com;;
Espaa;Comunidad de Madrid;19:00-21:00;Arganda del Rey;28500;GA Arganda;C/ De La Solidaridad n2 Bajo;Sbado;Madrid;Presencial;(616) 071514;arganda@jugadoresanonimos.org;;
Espaa;Comunidad de Madrid;19:00-21:00;Madrid;28019;GA Gacarabanchel;C/ Algorta n14 - sotano;Martes;Madrid;Presencial;(616) 071514;gacarabanchel@hotmail.com;;
Espaa;Comunidad de Madrid;11:00-13:00;Madrid;28028;GA Despertar;Avenida de los Toreros N45 - 1;Domingo;Madrid;Presencial;(616) 071514;gagrupodespertar45@gmail.com;;
Espaa;Cantabria;19:30-21:00;Torrelavega;39300;GA Besaya;C/ Julio Ruiz de Salazar s/n;Lunes;Cantabria;Presencial;(625) 915105;besaya@jugadoresanonimos.org;;
Espaa;Cantabria;20:00-22:00;Torrelavega;39300;GA Torrelavega;C/ Ceferino Caldern N3 - 1 B;Jueves;Cantabria;Presencial;(625) 915105;torrelavega@jugadoresanonimos.org;;
Espaa;Cantabria;20:00-21:30;Santander;39006;GA Cabomayor;C/ Juan del Castillo n 24;Martes;Cantabria;Presencial;(626) 594413;cabomayor@jugadoresanonimos.org;;
Espaa;Cantabria;20:00-21:30;Santander;39008;GA Santander;Calle Alta 19;Lunes;Cantabria;Presencial;(626) 594413;santander@jugadoresanonimos.org;;
Espaa;Cantabria;20:00-21:30;Santander;39008;GA Santander;Calle Alta 19;Mircoles;Cantabria;Presencial;(626) 594413;santander@jugadoresanonimos.org;;
Espaa;Comunidad Valenciana;19:00-21:00;Valencia;46007;GA Jerusalen;C/ de la Ermita n 1  1;Martes;Valencia;Presencial;(625) 769840;jerusalen@jugadoresanonimos.org;;
Espaa;Comunidad Valenciana;19:00-21:00;Valencia;46007;GA Jerusalen;C/ de la Ermita n 1  1;Jueves;Valencia;Presencial;(625) 769840;jerusalen@jugadoresanonimos.org;;
Espaa;Comunidad Valenciana;19:00-21:00;Valencia;46021;GA Maritimo;C/ Blasco Ibez n55;Lunes;Valencia;Presencial;(625) 769840;maritimo@jugadoresanonimos.org;;
Espaa;Comunidad Valenciana;19:00-21:00;Valencia;46021;GA Maritimo;C/ Blasco Ibez n55;Mircoles;Valencia;Presencial;(625) 769840;maritimo@jugadoresanonimos.org;;
Espaa;Comunidad Valenciana;19:30-21:00;Gandia;46702;GA La Safor;Plaza San Jos N 1;Martes;Valencia;Presencial;(644) 147802;lasafor@jugadoresanonimos.org;;
Espaa;Catalunya;19:30-20:30;Reus;43205;GA Reus 26;Plaa de L\`esglesia n 2;Martes;Tarragona;Presencial;(606) 461883;;;
Espaa;Catalunya;19:00-21:00;La Roca del Valls;08430;GA Vida Limpia;C/ Valencia n57;Jueves;Barcelona;Presencial;(606) 461883;bcn@jugadoresanonimos.org;;
Espaa;Catalunya;19:00-21:00;Terrassa;08222;GA Nueva Vida;Plaa Segle XX S/N;Martes;Barcelona;Presencial;(606) 461883;bcn@jugadoresanonimos.org;;
Espaa;Catalunya;11:00-13:00;Terrassa;08222;GA Solo por Hoy;Plaa Segle XX S/N;Sbado;Barcelona;Presencial;(606) 461883;bcn@jugadoresanonimos.org;;
Espaa;Catalunya;19:00-20:30;Cabrera de Mar;08349;GA Maresme;Pla de lavella S/N;Viernes;Barcelona;Presencial;(606) 461883;bcn@jugadoresanonimos.org;;
Espaa;Catalunya;18:30-20:00;L'Hospitalet de Llobregat;08907;GA Aceptacin;Rambla Marina 232;Lunes;Barcelona;Presencial;(606) 461883;bcn@jugadoresanonimos.org;;
Espaa;Catalunya;19:00-21:00;Sant Adri de Bess;08930;GA La Pau;C/ San Pedro n 1;Mircoles;Barcelona;Presencial;(606) 461883;bcn@jugadoresanonimos.org;;
Espaa;Catalunya;19:00-20:30;Barcelona;08003;GA Providencia-Crecer;C/ dels Sombrerers, N 6 - 6 Planta;Martes;Barcelona;Presencial;(606) 461883;bcn@jugadoresanonimos.org;;
Espaa;Catalunya;18:00-20:00;Barcelona;08009;GA 88;C/ Roger de Lluria, 70;Viernes;Barcelona;Presencial;(606) 461883;bcn@jugadoresanonimos.org;;
Mexico;;19:00-20:30;Colonia Alamitos;;Grupo Libertad;Av. Juan de Dios Peza 402-B;Lunes;Mexicali , Baja California;Presencial;(686) 339-4285;libertad@jamexicali.org;;
Mexico;;19:00-20:30;Colonia Alamitos;;Grupo Libertad;Av. Juan de Dios Peza 402-B;Mircoles;Mexicali , Baja California;Presencial;(686) 339-4285;libertad@jamexicali.org;;
Mexico;;12:00-13:30;Colonia Alamitos;;Grupo Libertad;Av. Juan de Dios Peza 402-B;Viernes;Mexicali , Baja California;Presencial;(686) 339-4285;libertad@jamexicali.org;;
Mexico;;12:00-13:30;Colonia Alamitos;;Grupo Libertad;Av. Juan de Dios Peza 402-B;Sbado;Mexicali , Baja California;Presencial;(686) 339-4285;libertad@jamexicali.org;;
Mexico;;12:00-13:30;Colonia Alamitos;;Grupo Libertad;Av. Juan de Dios Peza 402-B;Domingo;Mexicali , Baja California;Presencial;(686) 339-4285;libertad@jamexicali.org;;
Mexico;;17:00-19:00;Colonia Bustamante;;Nueva Vida;Calle Novena e Insurgentes 1500;Lunes;Ensenada , Baja California;Presencial;+52 646 344 2389;januevavidaens@gmail.com;;
Mexico;;17:00-19:00;Colonia Bustamante;;Nueva Vida;Calle Novena e Insurgentes 1500;Mircoles;Ensenada , Baja California;Presencial;+52 646 344 2389;januevavidaens@gmail.com;;
Mexico;;17:00-19:00;Colonia Bustamante;;Nueva Vida;Calle Novena e Insurgentes 1500;Viernes;Ensenada , Baja California;Presencial;+52 646 344 2389;januevavidaens@gmail.com;;
Mexico;;18:00+20:00;Colonia Las Brisas C.p. 22117;;Nuevo Comienzo;Plaza Los Arcos;Lunes;Tijuana , Baja California;Presencial; 664 347 9424;nuevocomienzo@gmail.com;;
Mexico;;18:00+20:00;Colonia Las Brisas C.p. 22117;;Nuevo Comienzo;Plaza Los Arcos;Viernes;Tijuana , Baja California;Presencial; 664 347 9424;nuevocomienzo@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;19:30-21:00;Col. Agrcola Chimalistac;01050;Grupo Jugadores Annimos La Luz;Tecoyotitla 349;Lunes;Ciudad de Mxico , CDMX;Presencial;(557) 896-1682;ja.grupolaluz@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;19:30-21:00;Col. Agrcola Chimalistac;01050;Grupo Jugadores Annimos La Luz;Tecoyotitla 349;Sbado;Ciudad de Mxico , CDMX;Presencial;(557) 896-1682;ja.grupolaluz@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;19:00-21:00;Colonia Polanco;;Plaza Polanco G.A.;Jaime Balmes Nm. 11 Local 119C;Lunes;Mxico D.F.;Presencial;(555) 433-1942;grupojapolanco@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;19:00-21:00;Colonia Polanco;;Plaza Polanco G.A.;Jaime Balmes Nm. 11 Local 119C;Martes;Mxico D.F.;Presencial;(555) 433-1942;grupojapolanco@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;19:00-21:00;Colonia Polanco;;Plaza Polanco G.A.;Jaime Balmes Nm. 11 Local 119C;Mircoles;Mxico D.F.;Presencial;(555) 433-1942;grupojapolanco@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;19:00-21:00;Colonia Polanco;;Plaza Polanco G.A.;Jaime Balmes Nm. 11 Local 119C;Jueves;Mxico D.F.;Presencial;(555) 433-1942;grupojapolanco@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;09:00-10:30;Colonia Polanco;;Plaza Polanco G.A.;Jaime Balmes Nm. 11 Local 119C;Sbado;Mxico D.F.;Presencial;(555) 433-1942;grupojapolanco@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;11:00-12:30;Colonia Polanco;;Plaza Polanco G.A.;Jaime Balmes Nm. 11 Local 119C;Domingo;Mxico D.F.;Presencial;(555) 433-1942;grupojapolanco@gmail.com;;
Mexico;Ciudad de Mxico , CDMX;18:00-20:30;Colonia Bosques de Las Lomas; 05120;JA Bosques;Bosque de Radiatas 18-401. Plaza Radiatas;Lunes;Cuajimalpa;Presencial; +52 561 010 7984;;;
Mexico;Ciudad de Mxico , CDMX;19:00-20:30;Colonia Bosques de Las Lomas; 05120;JA Bosques;Bosque de Radiatas 18-401. Plaza Radiatas;Martes;Cuajimalpa;Presencial; +52 561 010 7984;;;
Mexico;Ciudad de Mxico , CDMX;19:00-20:30;Colonia Bosques de Las Lomas; 05120;JA Bosques;Bosque de Radiatas 18-401. Plaza Radiatas;Jueves;Cuajimalpa;Presencial; +52 561 010 7984;;;
Mexico;Ciudad de Mxico , CDMX;07:30-09:00;Colonia Bosques de Las Lomas; 05120;JA Bosques;Bosque de Radiatas 18-401. Plaza Radiatas;Mircoles;Cuajimalpa;Presencial; +52 561 010 7984;;;
Mexico;Chihuahua;19:30 - 21:00;Colonia San Felipe;;Grupo Juventud;Jos Mart 3104 esquina Av. Insurgentes;Lunes;Chihuahua ;Presencial;;;;
Mexico;Chihuahua;19:30 - 21:00;Colonia San Felipe;;Grupo Juventud;Jos Mart 3104 esquina Av. Insurgentes;Martes;Chihuahua ;Presencial;;;;
Mexico;Chihuahua;19:30 - 21:00;Colonia San Felipe;;Grupo Juventud;Jos Mart 3104 esquina Av. Insurgentes;Mircoles;Chihuahua ;Presencial;;;;
Mexico;Chihuahua;19:30 - 21:00;Colonia San Felipe;;Grupo Juventud;Jos Mart 3104 esquina Av. Insurgentes;Jueves;Chihuahua ;Presencial;;;;
Mexico;Chihuahua;19:30 - 21:00;Colonia San Felipe;;Grupo Juventud;Jos Mart 3104 esquina Av. Insurgentes;Viernes;Chihuahua ;Presencial;;;;
Mexico;Coahuila;19:30 - 21:00;Colonia Torren Jardn;;Grupo Jugadores Annimos Torren;Plaza del Sol Local # 11(entrada por Eglantinas);Lunes;Torren;Presencial;(871) 125-3165;jatorreon@hotmail.com;;
Mexico;Coahuila;19:30 - 21:00;Colonia Torren Jardn;;Grupo Jugadores Annimos Torren;Plaza del Sol Local # 11(entrada por Eglantinas);Martes;Torren;Presencial;(871) 125-3165;jatorreon@hotmail.com;;
Mexico;Coahuila;19:30 - 21:00;Colonia Torren Jardn;;Grupo Jugadores Annimos Torren;Plaza del Sol Local # 11(entrada por Eglantinas);Jueves;Torren;Presencial;(871) 125-3165;jatorreon@hotmail.com;;
Mexico;Guanajuato;19:30 - 21:00;Jardnes del Mora;37160;Jugadores Annimos del Bajo;Av. Guanajuato 104;Lunes;Len ;Presencial;(477) 664-3587;;;
Mexico;Guanajuato;19:30 - 21:00;Jardnes del Mora;37160;Jugadores Annimos del Bajo;Av. Guanajuato 104;Mircoles;Len ;Presencial;(477) 664-3587;;;
Mexico;Guanajuato;19:00 - 20:30;Hotel Best Western Plaza Florida;36660;Grupo Nuevo Camino Irapuato;Av. Guerrero #1644 "Saln Enrico";Lunes;Irapuato;Presencial;;j.a.irapuato@hotmail.com;;
Mexico;Guanajuato;19:00 - 20:30;Hotel Best Western Plaza Florida;36660;Grupo Nuevo Camino Irapuato;Av. Guerrero #1644 "Saln Enrico";Mircoles;Irapuato;Presencial;;j.a.irapuato@hotmail.com;;
Mexico;;19:00 - 20:30;Salamanca;;Grupo Camino a la Libertad;Calle Aldama #902;lunes;Guanajuato;Presencial;(464) 106-9808;;;
Mexico;;19:00 - 20:30;Salamanca;;Grupo Camino a la Libertad;Calle Aldama #902;martes;Guanajuato;Presencial;(464) 106-9808;;;
Mexico;;19:00 - 20:30;Salamanca;;Grupo Camino a la Libertad;Calle Aldama #902;jueves;Guanajuato;Presencial;(464) 106-9808;;;
Mexico;;19:00 - 20:30;Guadalajara;;Grupo Santiago de Guadalajara;Av. Mxico # 3370 Local I - 5 y 6;Lunes; Jalisco;Presencial;3329537270;gruposantiagogdl@gmail.com;;
Mexico;;19:00 - 20:30;Guadalajara;;Grupo Santiago de Guadalajara;Av. Mxico # 3370 Local I - 5 y 6;martes; Jalisco;Presencial;3329537270;gruposantiagogdl@gmail.com;;
Mexico;;19:00 - 20:30;Guadalajara;;Grupo Santiago de Guadalajara;Av. Mxico # 3370 Local I - 5 y 6;Miercoles; Jalisco;Presencial;3329537270;gruposantiagogdl@gmail.com;;
Mexico;;19:00 - 20:30;Guadalajara;;Grupo Santiago de Guadalajara;Av. Mxico # 3370 Local I - 5 y 6;jueves; Jalisco;Presencial;3329537270;gruposantiagogdl@gmail.com;;
Mexico;;19:00 - 20:30;Guadalajara;;Grupo Santiago de Guadalajara;Av. Mxico # 3370 Local I - 5 y 6;Viernes; Jalisco;Presencial;3329537270;gruposantiagogdl@gmail.com;;
Mexico;;19:00 - 20:30;Guadalajara;;Grupo Santiago de Guadalajara;Av. Mxico # 3370 Local I - 5 y 6;Sabado; Jalisco;Presencial;3329537270;gruposantiagogdl@gmail.com;;
Mexico;;19:00 - 20:30;Guadalajara;;Grupo Santiago de Guadalajara;Av. Mxico # 3370 Local I - 5 y 6;Domingo; Jalisco;Presencial;3329537270;gruposantiagogdl@gmail.com;;
Mexico;Jalisco;19:00 - 20:30;Ciudad del Sol;;Grupo Serenidad;Atoyac # 325;Lunes;Zapopan;Presencial;3322455695;gruposerenidad.ja@gmail.com;;
Mexico;Jalisco;19:00 - 20:30;Ciudad del Sol;;Grupo Serenidad;Atoyac # 325;Miercoles;Zapopan;Presencial;3322455695;gruposerenidad.ja@gmail.com;;
Mexico;Jalisco;19:00 - 20:30;Ciudad del Sol;;Grupo Serenidad;Atoyac # 325;Viernes;Zapopan;Presencial;3322455695;gruposerenidad.ja@gmail.com;;
Mexico;Jalisco; 11:00 - 12:30;Ciudad del Sol;;Grupo Serenidad;Atoyac # 325;Domingo;Zapopan;Presencial;3322455695;gruposerenidad.ja@gmail.com;;
Mexico;Jalisco;19:00 - 20:30;Colonia Centro;;Jugadores Annimos Tepatitln;Calle Guadalupe Victoria # 175;Lunes;Tepatitln de Morelos;Presencial;+52 378 113 8877;jugadoresanonimostepa@hotmail.com;;
Mexico;Jalisco;19:00 - 20:30;Colonia Centro;;Jugadores Annimos Tepatitln;Calle Guadalupe Victoria # 175;Miercoles;Tepatitln de Morelos;Presencial;+52 378 113 8877;jugadoresanonimostepa@hotmail.com;;
Mexico;Jalisco;19:00 - 20:30;Colonia Centro;;Jugadores Annimos Tepatitln;Calle Guadalupe Victoria # 175;Viernes;Tepatitln de Morelos;Presencial;+52 378 113 8877;jugadoresanonimostepa@hotmail.com;;
Mexico;Nuevo Len; 19:00 - 20:30;Villa Universidad;66420;Grupo Solo Por Hoy;Centro DIF San Nicols;Lunes;San Nicols de los Garza;Presencial; 8116881454;jasoloporhoy@hotmail.com;;
Mexico;Nuevo Len; 19:00 - 20:30;Villa Universidad;66420;Grupo Solo Por Hoy;Centro DIF San Nicols;Martes;San Nicols de los Garza;Presencial; 8116881454;jasoloporhoy@hotmail.com;;
Mexico;Nuevo Len; 19:00 - 20:30;Villa Universidad;66420;Grupo Solo Por Hoy;Centro DIF San Nicols;Miercoles;San Nicols de los Garza;Presencial; 8116881454;jasoloporhoy@hotmail.com;;
Mexico;Nuevo Len; 19:00 - 20:30;Villa Universidad;66420;Grupo Solo Por Hoy;Centro DIF San Nicols;Jueves;San Nicols de los Garza;Presencial; 8116881454;jasoloporhoy@hotmail.com;;
Mexico;Nuevo Len; 19:00 - 20:30;Villa Universidad;66420;Grupo Solo Por Hoy;Centro DIF San Nicols;Viernes;San Nicols de los Garza;Presencial; 8116881454;jasoloporhoy@hotmail.com;;
Mexico;Nuevo Len;17:00 - 18:30;Villa Universidad;66420;Grupo Solo Por Hoy;Centro DIF San Nicols;Sabado;San Nicols de los Garza;Presencial; 8116881454;jasoloporhoy@hotmail.com;;
Mexico;Nuevo Len;18:00 - 20:00;San Pedro 400;;Grupo Primer Paso;Platino 302 Ote. (esquina con Cobalto);Lunes;San Pedro Garza Garca;Presencial;8110410286;jugadoresanonimos@hotmail.com;;
Mexico;Nuevo Len;18:00 - 20:00;San Pedro 400;;Grupo Primer Paso;Platino 302 Ote. (esquina con Cobalto);Martes;San Pedro Garza Garca;Presencial;8110410286;jugadoresanonimos@hotmail.com;;
Mexico;Nuevo Len;18:00 - 20:00;San Pedro 400;;Grupo Primer Paso;Platino 302 Ote. (esquina con Cobalto);Miercoles;San Pedro Garza Garca;Presencial;8110410286;jugadoresanonimos@hotmail.com;;
Mexico;Nuevo Len;18:00 - 20:00;San Pedro 400;;Grupo Primer Paso;Platino 302 Ote. (esquina con Cobalto);Jueves;San Pedro Garza Garca;Presencial;8110410286;jugadoresanonimos@hotmail.com;;
Mexico;Nuevo Len;18:00 - 20:00;San Pedro 400;;Grupo Primer Paso;Platino 302 Ote. (esquina con Cobalto);Viernes;San Pedro Garza Garca;Presencial;8110410286;jugadoresanonimos@hotmail.com;;
Mexico;Nuevo Len;17:30 - 19:00;San Pedro 400;;Grupo Primer Paso;Platino 302 Ote. (esquina con Cobalto);Sabado;San Pedro Garza Garca;Presencial;8110410286;jugadoresanonimos@hotmail.com;;
Mexico; Nuevo Len;19:00 - 20:30;Viviano Villarreal 453;64389;Cumbres Serenidad;Viviano Villarreal 453;Lunes;Monterrey;Presencial;+52 811-654-6503;;;
Mexico; Nuevo Len;19:00 - 20:30;Viviano Villarreal 453;64389;Cumbres Serenidad;Viviano Villarreal 453;Martes;Monterrey;Presencial;+52 811-654-6503;;;
Mexico; Nuevo Len;19:00 - 20:30;Viviano Villarreal 453;64389;Cumbres Serenidad;Viviano Villarreal 453;Miercoles;Monterrey;Presencial;+52 811-654-6503;;;
Mexico; Nuevo Len;19:00 - 20:30;Viviano Villarreal 453;64389;Cumbres Serenidad;Viviano Villarreal 453;Jueves;Monterrey;Presencial;+52 811-654-6503;;;
Mexico; Nuevo Len;19:00 - 20:30;Viviano Villarreal 453;64389;Cumbres Serenidad;Viviano Villarreal 453;Viernes;Monterrey;Presencial;+52 811-654-6503;;;
Mexico;Puebla ;19:30 - 21:00;Colonia La Paz;;Grupo Gratitud;Calle Almolonga #81;Lunes;Puebla ;Presencial;222 716 1181;jagratitudpuebla@gmail.com;;
Mexico;Puebla ;19:30 - 21:00;Colonia La Paz;;Grupo Gratitud;Calle Almolonga #81;Miercoles;Puebla ;Presencial;222 716 1181;jagratitudpuebla@gmail.com;;
Mexico;Puebla ;19:30 - 21:00;Colonia La Paz;;Grupo Gratitud;Calle Almolonga #81;Viernes;Puebla ;Presencial;222 716 1181;jagratitudpuebla@gmail.com;;
Mexico;Quertaro;18:00 - 19:30;Cimatario;;Grupo Buena Voluntad;Ignacio M. De Las Casas 38A;Martes;Quertaro;Presencial;442 121 7089;ja.buenavoluntad@gmail.com;;
Mexico;Quertaro;18:00 - 19:30;Cimatario;;Grupo Buena Voluntad;Ignacio M. De Las Casas 38A;Jueves;Quertaro;Presencial;442 121 7089;ja.buenavoluntad@gmail.com;;
Mexico;Quertaro;18:00 - 19:30;Cimatario;;Grupo Buena Voluntad;Ignacio M. De Las Casas 38A;Viernes;Quertaro;Presencial;442 121 7089;ja.buenavoluntad@gmail.com;;
Mexico;Quertaro;9:00 - 10:30;Cimatario;;Grupo Buena Voluntad;Ignacio M. De Las Casas 38A;Sabado;Quertaro;Presencial;442 121 7089;ja.buenavoluntad@gmail.com;;
Mexico;Quertaro;10:00 - 11:30;Cimatario;;Grupo Buena Voluntad;Ignacio M. De Las Casas 38A;Domingo;Quertaro;Presencial;442 121 7089;ja.buenavoluntad@gmail.com;;
Mexico;Cancn;8:00  9:30;Zona Turstica 2da. Etapa;77500;Grupo JA Ave Fnix en Cancn;Plaza Nautilus Local #30;Lunes;Quintana Roo;presencial;998 494 7970;jugadoresanocun@gmail.com;;
Mexico;Cancn;8:00  9:30;Zona Turstica 2da. Etapa;77500;Grupo JA Ave Fnix en Cancn;Plaza Nautilus Local #30;Miercoles;Quintana Roo;presencial;998 494 7970;jugadoresanocun@gmail.com;;
Mexico;Cancn;8:00  9:30;Zona Turstica 2da. Etapa;77500;Grupo JA Ave Fnix en Cancn;Plaza Nautilus Local #30;Viernes;Quintana Roo;presencial;998 494 7970;jugadoresanocun@gmail.com;;
Mexico;Sinaloa;18:00 - 19:30;Colonia 12 de Octubre;;Grupo Mi Vida Nueva;Ro Fuerte 1205;Lunes;Los Mochis;presencial; 6681680209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia 12 de Octubre;;Grupo Mi Vida Nueva;Ro Fuerte 1205;Martes;Los Mochis;presencial; 6681680209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia 12 de Octubre;;Grupo Mi Vida Nueva;Ro Fuerte 1205;Miercoles;Los Mochis;presencial; 6681680209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia 12 de Octubre;;Grupo Mi Vida Nueva;Ro Fuerte 1205;Jueves;Los Mochis;presencial; 6681680209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia 12 de Octubre;;Grupo Mi Vida Nueva;Ro Fuerte 1205;Viernes;Los Mochis;presencial; 6681680209;;;
Mexico;Sinaloa;7:00 - 8:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Lunes;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa;7:00 - 8:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Miercoles;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa;7:00 - 8:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Viernes;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa; 17:00 - 18:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Sabado;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Lunes;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Martes;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Miercoles;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Jueves;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa;18:00 - 19:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Viernes;Culiacn;presencial;+52 668 168 0209;;;
Mexico;Sinaloa;10:00 - 11:30;Colonia Tres Ros;;Grupo Respira;Blvd. Alfonso Zaragoza Maytorena #1850 Local 10;Domingo;Culiacn;presencial;+52 668 168 0209;;;
Mexico; Sonora;19:00 -20:30;Entre Quintana Roo y Chiapas;;Grupo Trascender;Allende 1020 Local # 4;Lunes;Cd. Obregn;Presencial; 6442202780;grupotrascenderobregon@hotmail.com;;
Mexico; Sonora;19:00 -20:30;Entre Quintana Roo y Chiapas;;Grupo Trascender;Allende 1020 Local # 4;Martes;Cd. Obregn;Presencial; 6442202780;grupotrascenderobregon@hotmail.com;;
Mexico; Sonora;19:00 -20:30;Entre Quintana Roo y Chiapas;;Grupo Trascender;Allende 1020 Local # 4;Miercoles;Cd. Obregn;Presencial; 6442202780;grupotrascenderobregon@hotmail.com;;
Mexico; Sonora;19:00 -20:30;Entre Quintana Roo y Chiapas;;Grupo Trascender;Allende 1020 Local # 4;Jueves;Cd. Obregn;Presencial; 6442202780;grupotrascenderobregon@hotmail.com;;
Mexico; Sonora;19:00 -20:30;Entre Quintana Roo y Chiapas;;Grupo Trascender;Allende 1020 Local # 4;Viernes;Cd. Obregn;Presencial; 6442202780;grupotrascenderobregon@hotmail.com;;
Mexico; Sonora;17:30 - 19:00;Entre Quintana Roo y Chiapas;;Grupo Trascender;Allende 1020 Local # 4;Sbado;Cd. Obregn;Presencial; 6442202780;grupotrascenderobregon@hotmail.com;;
Mexico; Sonora;19:15 - 20:45;Entre Quintana Roo y Tlaxcala;;Grupo Esfuerzo y Esperanza;General Pia #123;Lunes;Hermosillo;Presencial; 6622781445;;;
Mexico; Sonora;19:15 - 20:45;Entre Quintana Roo y Tlaxcala;;Grupo Esfuerzo y Esperanza;General Pia #123;Martes;Hermosillo;Presencial; 6622781445;;;
Mexico; Sonora;19:15 - 20:45;Entre Quintana Roo y Tlaxcala;;Grupo Esfuerzo y Esperanza;General Pia #123;Miercoles;Hermosillo;Presencial; 6622781445;;;
Mexico; Sonora;19:15 - 20:45;Entre Quintana Roo y Tlaxcala;;Grupo Esfuerzo y Esperanza;General Pia #123;Jueves;Hermosillo;Presencial; 6622781445;;;
Mexico; Sonora;19:15 - 20:45;Entre Quintana Roo y Tlaxcala;;Grupo Esfuerzo y Esperanza;General Pia #123;Viernes;Hermosillo;Presencial; 6622781445;;;
Mexico; Sonora;19:00 - 20:30;Colonia Federal;83489;Grupo Reconocer;Cjon. Mrida entre calle 25 y calle 26 #2501;Lunes;San Luis Ro Colorado;Presencial;;;;
Mexico; Sonora;19:00 - 20:30;Colonia Federal;83489;Grupo Reconocer;Cjon. Mrida entre calle 25 y calle 26 #2501;Martes;San Luis Ro Colorado;Presencial;;;;
Mexico; Sonora;19:00 - 20:30;Colonia Federal;83489;Grupo Reconocer;Cjon. Mrida entre calle 25 y calle 26 #2501;Miercoles;San Luis Ro Colorado;Presencial;;;;
Mexico; Sonora;19:00 - 20:30;Colonia Federal;83489;Grupo Reconocer;Cjon. Mrida entre calle 25 y calle 26 #2501;Jueves;San Luis Ro Colorado;Presencial;;;;
Mexico; Sonora;19:00 - 20:30;Colonia Federal;83489;Grupo Reconocer;Cjon. Mrida entre calle 25 y calle 26 #2501;Viernes;San Luis Ro Colorado;Presencial;;;;
Mexico; Sonora;19:00 - 20:30;Colonia Federal;83489;Grupo Reconocer;Cjon. Mrida entre calle 25 y calle 26 #2501;Sbado;San Luis Ro Colorado;Presencial;;;;
Mexico; Sonora;19:00 - 20:30;Colonia Federal;83489;Grupo Reconocer;Cjon. Mrida entre calle 25 y calle 26 #2501;Domingo;San Luis Ro Colorado;Presencial;;;;
Mexico; Tamaulipas;18:30 - 20:30;Colonia los Mangos;89440;JA Compartiendo Esperanza;Juventino Rosas #606;Lunes;Ciudad Madero;Presencial;+52 833 684 9855;;;
Mexico; Tamaulipas;18:30 - 20:30;Colonia los Mangos;89440;JA Compartiendo Esperanza;Juventino Rosas #606;Miercoles;Ciudad Madero;Presencial;+52 833 684 9855;;;
Mexico;Veracruz;19:00 - 20:30;Colonia Reforma;91919;Jugadores Annimos Veracruz;C. Martn Alonso Pinzn 529;Lunes;Veracruz;Presencial;+52 229 160 7293;jugadoresanonimosveracruz@gmail.com;;
Mexico;Veracruz;19:00 - 20:30;Colonia Reforma;91919;Jugadores Annimos Veracruz;C. Martn Alonso Pinzn 529;Martes;Veracruz;Presencial;+52 229 160 7293;jugadoresanonimosveracruz@gmail.com;;
Mexico;Veracruz;19:00 - 20:30;Colonia Reforma;91919;Jugadores Annimos Veracruz;C. Martn Alonso Pinzn 529;Miercoles;Veracruz;Presencial;+52 229 160 7293;jugadoresanonimosveracruz@gmail.com;;
Mexico;Veracruz;19:00 - 20:30;Colonia Reforma;91919;Jugadores Annimos Veracruz;C. Martn Alonso Pinzn 529;Jueves;Veracruz;Presencial;+52 229 160 7293;jugadoresanonimosveracruz@gmail.com;;
Mexico;Veracruz;19:00 - 20:30;Colonia Reforma;91919;Jugadores Annimos Veracruz;C. Martn Alonso Pinzn 529;Viernes;Veracruz;Presencial;+52 229 160 7293;jugadoresanonimosveracruz@gmail.com;;
Mexico;Veracruz;12:00 - 13:30;Colonia Reforma;91919;Jugadores Annimos Veracruz;C. Martn Alonso Pinzn 529;Domingo;Veracruz;Presencial;+52 229 160 7293;jugadoresanonimosveracruz@gmail.com;;
Mexico;Yucatn;20:00 - 21:30;Colonia Alemn / Itzimn;;Grupo Vuelve a Vivir;Avenida Alemn No. 99A entre 19 y 19A;Lunes;Mrida;Presencial;9995452925;jugadoresanonimosvuelveavivir@gmail.com;;
Mexico;Yucatn;20:00 - 21:30;Colonia Alemn / Itzimn;;Grupo Vuelve a Vivir;Avenida Alemn No. 99A entre 19 y 19A;Miercoles;Mrida;Presencial;9995452925;jugadoresanonimosvuelveavivir@gmail.com;;
Mexico;Yucatn;20:00 - 21:30;Colonia Alemn / Itzimn;;Grupo Vuelve a Vivir;Avenida Alemn No. 99A entre 19 y 19A;Viernes;Mrida;Presencial;9995452925;jugadoresanonimosvuelveavivir@gmail.com;;
Mexico;Yucatn;20:00 - 21:30;Colonia Alemn / Itzimn;;Grupo Vuelve a Vivir;Avenida Alemn No. 99A entre 19 y 19A;Sbado;Mrida;Presencial;9995452925;jugadoresanonimosvuelveavivir@gmail.com;;
Mexico;Yucatn; 20:00 - 21:30;Colonia San Esteban;;Un Da a la Vez;Calle 23 #349 x 12;Lunes;Mrida;Presencial; 999 575 6604;;;
Mexico;Yucatn; 20:00 - 21:30;Colonia San Esteban;;Un Da a la Vez;Calle 23 #349 x 12;Martes;Mrida;Presencial; 999 575 6604;;;
Mexico;Yucatn; 20:00 - 21:30;Colonia San Esteban;;Un Da a la Vez;Calle 23 #349 x 12;Miercoles;Mrida;Presencial; 999 575 6604;;;
Mexico;Yucatn; 20:00 - 21:30;Colonia San Esteban;;Un Da a la Vez;Calle 23 #349 x 12;Jueves;Mrida;Presencial; 999 575 6604;;;
Mexico;Yucatn; 20:00 - 21:30;Colonia San Esteban;;Un Da a la Vez;Calle 23 #349 x 12;Viernes;Mrida;Presencial; 999 575 6604;;;
Mexico;Yucatn; 20:00 - 21:30;Colonia San Esteban;;Un Da a la Vez;Calle 23 #349 x 12;Sbado;Mrida;Presencial; 999 575 6604;;;
Mexico;Yucatn; 20:00 - 21:30;Colonia San Esteban;;Un Da a la Vez;Calle 23 #349 x 12;Domingo;Mrida;Presencial; 999 575 6604;;;
Mexico;Yucatn;19:30 - 21:00;Jardines de Mrida;97135;Grupo Plenitud;Calle 23 # 543 x 60 (esquina) Local 3;Lunes;Mrida;Presencial; 999 183 2948;jugadoresanonimos.plenitud@gmail.com;;
Mexico;Yucatn;19:30 - 21:00;Jardines de Mrida;97135;Grupo Plenitud;Calle 23 # 543 x 60 (esquina) Local 3;Martes;Mrida;Presencial; 999 183 2948;jugadoresanonimos.plenitud@gmail.com;;
Mexico;Yucatn;19:30 - 21:00;Jardines de Mrida;97135;Grupo Plenitud;Calle 23 # 543 x 60 (esquina) Local 3;Jueves;Mrida;Presencial; 999 183 2948;jugadoresanonimos.plenitud@gmail.com;;
Mexico;Yucatn;19:30 - 21:00;Jardines de Mrida;97135;Grupo Plenitud;Calle 23 # 543 x 60 (esquina) Local 3;Viernes;Mrida;Presencial; 999 183 2948;jugadoresanonimos.plenitud@gmail.com;;
Paraguay;Asuncin;19:00-19:00;Cruz Del Chaco;1421;G.A. Juntos Venceremos ;; Martes;Asuncin;Presencial;595-981-596-207;;;
Paraguay;Asuncin;17:00-19:00;Asuncin;;G.A. Nueva Vida ;Alfredo Seiferheld; Viernes;Asuncin;Presencial;595-981-596-207;;;
Paraguay;;17:00-19:00;Coronel Oviedo;;G.A. Amor y F;Caaguaz Department; Domingo;;Presencial;595-981-596-207 ;;;
Paraguay;;09:00-11:00 ;Lambar;;G.A. Espiritu Santo; Central Department;Domingo;;presencial;;;;
Costa Rica;;20:00;Heredia ;40101;G.A. - La Mejor Opcion ;Heredia, 300 mts al Este de la POPS de Heredia a mano izquierda. Segunda planta, Local #8; Viernes;;Presencial;;;;
Costa Rica;;19:03;Heredia ;40101;G.A. - La Mejor Opcion ;Heredia, 300 mts al Este de la POPS de Heredia a mano izquierda. Segunda planta, Local #8;Domingo;;Presencial;;;;
Costa Rica;;20:00;Heredia ;40101;G.A. - La Mejor Opcion ;Heredia, 300 mts al Este de la POPS de Heredia a mano izquierda. Segunda planta, Local #8;Martes;;Presencial;;;;
Costa Rica;;20:00;San Jose;10101; G.A. - Grupo La Gran Decision; Plaza Gonzlez Viquez, De ferretera El Pipiolo 100 sur y 50 oeste, Tercera planta.;Viernes;;Presencial;;;;
Costa Rica;;20:00;San Jose;10101; G.A. - Grupo La Gran Decision; Plaza Gonzlez Viquez, De ferretera El Pipiolo 100 sur y 50 oeste, Tercera planta.;Lunes;;Presencial;;;;
Costa Rica;;20:00;San Jose;10101; G.A. - Grupo La Gran Decision; Plaza Gonzlez Viquez, De ferretera El Pipiolo 100 sur y 50 oeste, Tercera planta.;Sbado;;Presencial;;;;
Costa Rica;;20:00;San Jose;10101; G.A. - Grupo La Gran Decision; Plaza Gonzlez Viquez, De ferretera El Pipiolo 100 sur y 50 oeste, Tercera planta.;Domingo;;Presencial;;;;
Costa Rica;;20:00;San Jose;10101; G.A. - Grupo La Gran Decision; Plaza Gonzlez Viquez, De ferretera El Pipiolo 100 sur y 50 oeste, Tercera planta.;Jueves;;Presencial;;;;
Costa Rica;;20:00;San Jose;10101; G.A. - Grupo La Gran Decision; Plaza Gonzlez Viquez, De ferretera El Pipiolo 100 sur y 50 oeste, Tercera planta.;Martes;;Presencial;;;;
Costa Rica;;20:00;San Jose;10101; G.A. - Grupo La Gran Decision; Plaza Gonzlez Viquez, De ferretera El Pipiolo 100 sur y 50 oeste, Tercera planta.;Miercoles;;Presencial;;;;
Nicaragua;;18:00-20:00;Nicaragua;;Nicaragua G.A;Fe y Esperanza Plaza Parque Domingo Gadea;Viernes;;Presencial;;;;
Nicaragua;;18:00-20:00;Nicaragua;;Nicaragua G.A;Fe y Esperanza Plaza Parque Domingo Gadea;Lunes;;Presencial;;;;
Nicaragua;;18:00-20:00;Nicaragua;;Nicaragua G.A;Fe y Esperanza Plaza Parque Domingo Gadea;Sbado;;Presencial;;;;
Nicaragua;;18:00-20:00;Nicaragua;;Nicaragua G.A;Fe y Esperanza Plaza Parque Domingo Gadea;Domingo;;Presencial;;;;
Nicaragua;;18:00-20:00;Nicaragua;;Nicaragua G.A;Fe y Esperanza Plaza Parque Domingo Gadea;Jueves;;Presencial;;;;
Nicaragua;;18:00-20:00;Nicaragua;;Nicaragua G.A;Fe y Esperanza Plaza Parque Domingo Gadea;Martes;;Presencial;;;;
Nicaragua;;18:00-20:00;Nicaragua;;Nicaragua G.A;Fe y Esperanza Plaza Parque Domingo Gadea;Miercoles;;Presencial;;;;
Peru;;19:00-20:00; San Isidro;;San Isidro G.A;Av. Los Conquistadores 1293;Viernes;;Presencial;;;;
Peru;;19:00-20:00; San Isidro;;J.A Grupo "Los Pioneros";Av. Los Conquistadores 1293;Lunes;;Presencial;;;;
Peru;;19:00-20:00; San Isidro;;J.A Grupo "Los Pioneros";Av. Los Conquistadores 1293;Jueves;;Presencial;;;;
Argentina;;18:00-20:00;Agronoma;;Agronoma;Plaza 1160;Lunes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;18:50-20:50;Almagro;;Creer;Quintino Bocayuva 144, 1 piso;Lunes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:00;Barrio Norte;;Alegra;Larrea y Beruti  1 piso;Lunes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;18:30-20:30;Boedo / Parque Chacabuco;;Unidad;Avelino Daz 560 (entre Doblas y Viel);Lunes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:15;Flores;;Vivencias;Yerbal 2451 (frente a la plaza de Flores);Lunes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:00;Belgrano;;Nueva Vida;Vidal 1745;Martes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:00;Centro;;Renacer;Av. Corrientes 718 (Entre Esmeralda y Maip);Martes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:15;Floresta;;Floresta;Baha Blanca N 323;Martes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;09:30-11:30;Palermo;;Matutino;Avenida Las Heras 2560 2 Piso;Martes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;18:50-20:50;Almagro;;Creer;Quintino Bocayuva 144, 1 piso;Miercoles;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;18:30-20:30;Boedo / Parque Chacabuco;;Unidad;Avelino Daz 560 (entre Doblas y Viel);Miercoles;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:00;Congreso;;Nacimiento;Sarand 65 (Entre Rivadavia e Hiplito Irigoyen);Miercoles;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:15;Flores;;Vivencias;Yerbal 2451 (frente a la plaza de Flores);Miercoles;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;18:00-20:00;Liniers;;Liniers;Cuzco 220 (a 3 cuadras de la estacin);Miercoles;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;18:00-20:00;Agronoma;;Agronoma;Plaza 1160;Jueves;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;18:50-20:50;Almagro;;Creer;Quintino Bocayuva 144, 1 piso;Jueves;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:00;Barrio Norte;;Alegra;Larrea y Beruti  1 piso;Jueves;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-20:30;Belgrano;;Nueva Vida;Vidal 1745;Jueves;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:00;Centro;;Renacer;Av. Corrientes 718 (Entre Esmeralda y Maip);Jueves;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:15;Floresta;;Floresta;Baha Blanca N 323;Jueves;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;09:30-11:30;Palermo;;Matutino;Avenida Las Heras 2560 2 Piso;Jueves;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;18:30-20:30;Boedo / Parque Chacabuco;;Unidad;Avelino Daz 560 (entre Doblas y Viel);Viernes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;19:00-21:15;Flores;;Vivencias;Yerbal 2451 (frente a la plaza de Flores);Viernes;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;12:00-14:30;Congreso;;Nacimiento;Sarand 65 (Entre Rivadavia e Hiplito Irigoyen);Sabado;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;16:00-18:30;Floresta;;Floresta;Baha Blanca N 323;Sbado;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;09:30-11:30;Palermo;;Matutino;Avenida Las Heras 2560 2 Piso;Sbado;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;10:30-11:30;Liniers;;Liniers;Cuzco 220 (a 3 cuadras de la estacin);Sbado;Ciudad Autnoma de Buenos Aires;Presencial;;;;
Argentina;;20:00-22:00;Martnez;;Despertar;Garca Merou 2635 esq. Williams (a 2 cuadras de Edison y Paran al oeste de la Panamericana);Lunes;Buenos Aires: Zona Norte;presencial;;;;
Argentina;;20:00-22:30;Vicente Lpez;;Grupo Olivos;Urquiza 1460;Martes;Buenos Aires: Zona Norte;presencial;;;;
Argentina;;18:30-20:45;Pilar;;Grupo Pilar;Belgrano 766. Parroquia Nuestra Seora Del Pilar;Martes;Buenos Aires: Zona Norte;presencial;;;;
Argentina;;20:00-22:30;Vicente Lpez;;Grupo Olivos;Urquiza 1460;Miercoles;Buenos Aires: Zona Norte;presencial;;;;
Argentina;;20:30-22:30;Martnez;;Despertar;Garca Merou 2635 esq. Williams (a 2 cuadras de Edison y Paran al oeste de la Panamericana);Jueves;Buenos Aires: Zona Norte;presencial;;;;
Argentina;;19:00-21:00;Pilar;;Grupo Pilar;Belgrano 766. Parroquia Nuestra Seora Del Pilar;Jueves;Buenos Aires: Zona Norte;presencial;;;;
Argentina;;20:00-22:30;Vicente Lpez;;Grupo Olivos;Urquiza 1460;Viernes;Buenos Aires: Zona Norte;presencial;;;;
Argentina;;19:00-21:00;Jos C. Paz;;Jos C. Paz;Roque Senz Pea 4951;Viernes;Buenos Aires: Zona Norte;presencial;;;;
Argentina;;20:00-22:00;Caseros;;Caseros;Sra. de la Merced 4624 (1/2 cuadra de Av. San Martn);Lunes;Buenos Aires: Zona Oeste;presencial;;;;
Argentina;;20:00-22:00;Castelar;;Castelar;Almafuerte 2670 1er. Piso (Castelar sur);Lunes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;Haedo;;Haedo;Estrada 226 (1 cuadra de Avenida Rivadavia);Lunes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;18:30-20:30;Ituzaing;;Ituzaing;Mansilla 867 (frente a la Plaza del lado Norte);Lunes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;19:00-21:30;San Miguel;;Empec a Vivir;Belgrano 1257;Lunes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;Castelar Sur;;4 de Septiembre;Almafuerte 2670 1er. Piso (Castelar sur);Martes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;19:00-21:00;Hurlingham;;Hurlingham;Uspallata 2086;Martes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;19:00-21:00;Merlo;;Merlo;Av. Garay 2751;Martes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;Morn;;Morn;Belgrano 357 (entre Mitre y Nuestra Sra. Del Buen Viaje);Martes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;Ramos Meja;;Ramos Meja;lvarez Jonte 77 (e/ Richieri y 9 de Julio  frente a la plaza);Martes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;18:00-20:00;Moreno;;Moreno;Claudio M. Joly 2760 (entre Asconape y Dr. Vera.);Miercoles;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;San Justo;;San Justo;Monseor Jos Francisco Marcn 2637 (entre Fcio. Varela y Mrmol);Miercoles;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;19:00-21:30;San Miguel;;Empec a Vivir;Belgrano 1257;Miercoles;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;Caseros;;Caseros;Sra. de la Merced 4624 (1/2 cuadra de Av. San Martn);Jueves;Buenos Aires: Zona Oeste;presencial;;;;
Argentina;;20:00-22:00;Castelar;;Castelar;Almafuerte 2670 1er. Piso (Castelar sur);Jueves;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;19:00-20:30;Haedo;;Haedo;Estrada 226 (1 cuadra de Avenida Rivadavia);Jueves;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;Castelar Sur;;4 de Septiembre;Almafuerte 2670 1er. Piso (Castelar sur);Viernes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;Morn;;Morn;Belgrano 357 (entre Mitre y Nuestra Sra. Del Buen Viaje);Viernes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;Ramos Meja;;Ramos Meja;lvarez Jonte 77 (e/ Richieri y 9 de Julio  frente a la plaza);Viernes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;20:00-22:00;San Justo;;San Justo;Monseor Jos Francisco Marcn 2637 (entre Fcio. Varela y Mrmol);Viernes;Buenos Aires: Zona Oeste;Presencial;;;;
Argentina;;18:00-20:00;Bernal;;Esperanza;Belgrano 450 (2do piso);Lunes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:15-20:15;Ezpeleta;;Ezpeleta;Carbonari N 379 (entre Lavalle y Brown);Lunes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:30-20:30;Lomas de Zamora;;Catedral;Senz 572 1 piso;Lunes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;Avellaneda;;Avellaneda;Av. Bartolom Mitre 3779  Sarand;Martes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;Lans  Remedios de Escalada;;Lans;Coln 2533 (desde estacin Lans colectivo 283 B1 y B3);Martes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:30;Lomas de Zamora;;Vivir;Alem 51 (a 2 cuadras de la estacin);Martes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:00-20:00;Quilmes Centro;;Quilmes Centro;Alberdi y Moreno (a 7 cuadras de la estacin);Martes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:30-21:00;Quilmes El Socorro;;El Socorro;Av. Calchaqui 4949  Quilmes Oeste;Martes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;Berazategui;;Berazategui;calle n136 entre 6 y 7;Miercoles;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;Burzaco;;Valor y Esperanza;Sempere 1370;Miercoles;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:15-20:15;Ezpeleta;;Ezpeleta;Carbonari N 379 (entre Lavalle y Brown);Miercoles;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;Avellaneda;;Avellaneda;Av. Bartolom Mitre 3779  Sarand;Jueves;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;La Plata;;La Plata;Calle 60 n 354 (entre 2 y 3 al lado del Banco Nacin);Jueves;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;Lans  Remedios de Escalada;;Lans;Coln 2533 (desde estacin Lans colectivo 283 B1 y B3);Jueves;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:30-20:30;Lomas de Zamora;;Catedral;Senz 572 1 piso;Jueves;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:00-20:00;Quilmes Centro;;Quilmes Centro;Alberdi y Moreno (a 7 cuadras de la estacin);Jueves;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;Bernal;;Esperanza;Belgrano 450 (2do piso);Viernes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:15-20:15;Ezpeleta;;Ezpeleta;Carbonari N 379 (entre Lavalle y Brown);Viernes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:30;Lomas de Zamora;;Vivir;Alem 51 (a 2 cuadras de la estacin);Viernes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:30-20:30;Florencio Varela;;Florencio Varela;25 de Mayo N 611;Viernes;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;18:00-20:00;Quilmes Centro;;Quilmes Centro;Alberdi y Moreno (a 7 cuadras de la estacin);Sabado;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-21:00;Berazategui;;Berazategui;calle n136 entre 6 y 7;Domingo;Buenos Aires: Zona Sur;Presencial;;;;
Argentina;;19:00-20:30;Santa Clara del Mar (Mar Chiquita);;Superacin;Monte Hermoso 833 (Monte Hermoso y Cardiff);Lunes;Buenos Aires: Interior;Presencial;;;;
Argentina;;20:00-22:00;Mar del Plata;;Aprender a Vivir;Don Bosco 655;Martes;Buenos Aires: Interior;Presencial;;;;
Argentina;;19:00-20:30;Santa Clara del Mar (Mar Chiquita);;Superacin;Monte Hermoso 833 (Monte Hermoso y Cardiff);Miercoles;Buenos Aires: Interior;Presencial;;;;
Argentina;;20:00-22:00;Mar del Plata;;Aprender a Vivir;Don Bosco 655;Jueves;Buenos Aires: Interior;Presencial;;;;
Argentina;;21:00-23:00;Corrientes Capital;;Libertad;Quintana 1165 (a 2 cuadras de la costanera);Miercoles;Corrientes;Presencial;;;;
Argentina;;21:00-23:00;Corrientes Capital;;Libertad;Quintana 1165 (a 2 cuadras de la costanera);Viernes;Corrientes;Presencial;;;;
Argentina;;20:00-21:00;San Salvador de Jujuy;;Jujuy;Av. Dr. Ricardo Balbn N 775 (Barrio Chijra);Martes;Jujuy;Presencial;;;;
Argentina;;20:00-21:00;San Salvador de Jujuy;;Jujuy;Av. Dr. Ricardo Balbn N 775 (Barrio Chijra);Jueves;Jujuy;Presencial;;;;
Argentina;;20:00-21:30;Libres Posadas;;Libres Posadas;Flix de Azara 1646 (entre Sarmiento y San Martn);Martes;Misiones;Presencial;;;;
Argentina;;17:00-19:00;Libres Posadas;;Libres Posadas;Flix de Azara 1646 (entre Sarmiento y San Martn);Sabado;Misiones;Presencial;;;;
Argentina;;21:00-23:00;Salta Capital;;Amanecer;Crdoba 33 (entre Caseros y Alvarado);Martes;Salta;Presencial;;;;
Argentina;;21:00-23:00;Santiago del Estero Capital;;Sumampa;Coln 546 sur (entre Sarmiento y San Martn);Miercoles;Santiago del Estero;Presencial;;;;
Argentina;;20:00-22:00;San Miguel de Tucumn;;Tucumn;Las Piedras 251 subsuelo (4 cuadras de la plaza La Independencia);Lunes;Tucumn;Presencial;;;;
Argentina;;20:30-22:00;San Miguel de Tucumn;;Amador Lucero;Amador Lucero 1360 (Barrio independencia);Martes;Tucumn;Presencial;;;;
Argentina;;20:30-22:00;San Miguel de Tucumn;;Renacer;Alem 550;Martes;Tucumn;Presencial;;;;
Argentina;;20:00-22:00;San Miguel de Tucumn;;Tucumn;Las Piedras 251 subsuelo (4 cuadras de la plaza La Independencia);Miercoles;Tucumn;Presencial;;;;
Argentina;;20:30-22:30;San Miguel de Tucumn;;Renacer;Alem 550;Jueves;Tucumn;Presencial;;;;
Argentina;;20:00-22:00;San Miguel de Tucumn;;Tucumn;Las Piedras 251 subsuelo (4 cuadras de la plaza La Independencia);Viernes;Tucumn;Presencial;;;;
Argentina;;20:30-22:30;San Miguel de Tucumn;;Renacer;Alem 550;Sbado;Tucumn;Presencial;;;;
Argentina;;19:00-21:00;Crdoba Capital;;El Tambo;Independencia 1142;Lunes;Crdoba;Presencial;;;;
Argentina;;18:00-20:30;Crdoba Capital;;San Roque;Rosario de Santa Fe 374 (1er. piso) Aula 19;Miercoles;Crdoba;Presencial;;;;
Argentina;;18:30-20:30;Crdoba Capital;;Toms S;Caseros 141 (entre Velez Sarsfield y Trejo);Jueves;Crdoba;Presencial;;;;
Argentina;;18:00-20:00;Paran;;Nueva Vida;Don Bosco 749;Martes;Entre Ros;Presencial;;;;
Argentina;;19:00-21:00;Mendoza Capital;;Retorno;Espejo 423;Lunes;Mendoza;Presencial;+54 9 2612 44-8573;;;
Argentina;;19:00-21:00;Mendoza Capital;;Retorno;Espejo 423;Miercoles;Mendoza;Presencial;+54 9 2612 44-8573;;;
Argentina;;20:00-21:30;San Juan Capital;;Volver a superarlo juntos;Larrain y Av. La Rioja;Jueves;San Juan;Presencial;;;;
Argentina;;19:00-21:00;Rosario;;Esperanza;Mendoza 1381;Lunes;Santa Fe;Presencial;;;;
Argentina;;19:00-21:00;Rosario;;Esperanza;Mendoza 1381;Viernes;Santa Fe;Presencial;;;;
Argentina;;19:00-21:00;Rosario;;Alas de Libertad;Saavedra 2100;Miercoles;Santa Fe;Presencial;;;`;

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/Espaa/g, 'España')
    .replace(/Comunidad Autnoma/g, 'Comunidad Autónoma')
    .replace(/Cdigo Postal/g, 'Código Postal')
    .replace(/Direccin/g, 'Dirección')
    .replace(/Da/g, 'Día')
    .replace(/Telfono/g, 'Teléfono')
    .replace(/Reunin/g, 'Reunión')
    .replace(/Mircoles/g, 'Miércoles')
    .replace(/Sbado/g, 'Sábado')
    .replace(/Mstoles/g, 'Móstoles')
    .replace(/Andaluca/g, 'Andalucía')
    .replace(/Cdiz/g, 'Cádiz')
    .replace(/Ilusin/g, 'Ilusión')
    .replace(/Guipzcoa/g, 'Guipúzcoa')
    .replace(/Ibez/g, 'Ibáñez')
    .replace(/Plaa/g, 'Plaça')
    .replace(/Valls/g, 'Vallès')
    .replace(/lavella/g, "l'avella")
    .replace(/Aceptacin/g, 'Aceptación')
    .replace(/Sant Adri/g, 'Sant Adrià')
    .replace(/Bess/g, 'Besòs')
    .replace(/Mxico/g, 'México')
    .replace(/Agrcola/g, 'Agrícola')
    .replace(/Annimos/g, 'Anónimos')
    .replace(/Nm/g, 'Núm')
    .replace(/N/g, 'Nº')
    .replace(/Mart/g, 'Martí')
    .replace(/Torren/g, 'Torreón')
    .replace(/Jardn/g, 'Jardín')
    .replace(/Jardnes/g, 'Jardines')
    .replace(/Bajo/g, 'Bajío')
    .replace(/Len/g, 'León')
    .replace(/Saln/g, 'Salón')
    .replace(/Len/g, 'León')
    .replace(/Garca/g, 'García')
    .replace(/Quertaro/g, 'Querétaro')
    .replace(/Cancn/g, 'Cancún')
    .replace(/Turstica/g, 'Turística')
    .replace(/Fnix/g, 'Fénix')
    .replace(/Ro/g, 'Río')
    .replace(/Culiacn/g, 'Culiacán')
    .replace(/Obregn/g, 'Obregón')
    .replace(/Pia/g, 'Piña')
    .replace(/Mrida/g, 'Mérida')
    .replace(/Martn/g, 'Martín')
    .replace(/Pinzn/g, 'Pinzón')
    .replace(/Yucatn/g, 'Yucatán')
    .replace(/Alemn/g, 'Alemán')
    .replace(/Asuncin/g, 'Asunción')
    .replace(/Amor y F/g, 'Amor y Fé')
    .replace(/Caaguaz/g, 'Caaguazú')
    .replace(/Lambar/g, 'Lambaré')
    .replace(/Gonzlez/g, 'González')
    .replace(/Viquez/g, 'Víquez')
    .replace(/ferretera/g, 'ferretería')
    .replace(/Agronoma/g, 'Agronomía')
    .replace(/Alegra/g, 'Alegría')
    .replace(/Daz/g, 'Díaz')
    .replace(/Baha/g, 'Bahía')
    .replace(/Sarand/g, 'Sarandí')
    .replace(/Hiplito/g, 'Hipólito')
    .replace(/Seora/g, 'Señora')
    .replace(/Jos/g, 'José')
    .replace(/Pea/g, 'Peña')
    .replace(/Ituzaing/g, 'Ituzaingó')
    .replace(/Empec/g, 'Empecé')
    .replace(/Morn/g, 'Morón')
    .replace(/Meja/g, 'Mejía')
    .replace(/lvarez/g, 'Álvarez')
    .replace(/Monseor/g, 'Monseñor')
    .replace(/Marcn/g, 'Marcón')
    .replace(/Mrmol/g, 'Mármol')
    .replace(/Senz/g, 'Sáenz')
    .replace(/Lans/g, 'Lanús')
    .replace(/Coln/g, 'Colón')
    .replace(/estacin/g, 'estación')
    .replace(/Bartolom/g, 'Bartolomé')
    .replace(/Nacin/g, 'Nación')
    .replace(/Superacin/g, 'Superación')
    .replace(/Balbn/g, 'Balbín')
    .replace(/Flix/g, 'Félix')
    .replace(/Crdoba/g, 'Córdoba')
    .replace(/Tucumn/g, 'Tucumán')
    .replace(/Toms/g, 'Tomás')
    .replace(/Paran/g, 'Paraná')
    .replace(/Ros/g, 'Ríos')
    .trim();
}

function parseDay(dayStr) {
  const d = dayStr.toLowerCase().trim();
  if (d.includes('lunes')) return { dayOfWeek: 1, dayName: 'Lunes' };
  if (d.includes('martes') || d === 'm') return { dayOfWeek: 2, dayName: 'Martes' };
  if (d.includes('mier') || d.includes('miér')) return { dayOfWeek: 3, dayName: 'Miércoles' };
  if (d.includes('jueves')) return { dayOfWeek: 4, dayName: 'Jueves' };
  if (d.includes('viernes')) return { dayOfWeek: 5, dayName: 'Viernes' };
  if (d.includes('sab') || d.includes('sáb')) return { dayOfWeek: 6, dayName: 'Sábado' };
  if (d.includes('domingo')) return { dayOfWeek: 0, dayName: 'Domingo' };
  return { dayOfWeek: 1, dayName: 'Lunes' };
}

function parseTime(timeStr) {
  const t = timeStr.replace(/[;+]/g, ':').replace(/\s+/g, ' ').trim();
  // e.g. 19:00-21:00 or 19:00 - 20:30
  const match = t.match(/(\d{1,2})[:;](\d{2})/);
  if (match) {
    const hh = match[1].padStart(2, '0');
    const mm = match[2];
    return `${hh}:${mm}`;
  }
  return '19:00';
}

const lines = rawData.trim().split('\n');
const meetings = [];

lines.forEach((line, index) => {
  if (!line.trim()) return;
  const parts = line.split(';').map(p => cleanText(p));
  if (parts.length < 8) return;

  const [
    pais,
    comunidad,
    horaRaw,
    ciudad,
    codigoPostal,
    nombreGrupo,
    direccion,
    diaRaw,
    provincia,
    tipo,
    telefono,
    correo,
    web
  ] = parts;

  const { dayOfWeek, dayName } = parseDay(diaRaw);
  const time = parseTime(horaRaw);

  const cityDisplay = ciudad ? ciudad : (provincia || comunidad || pais);
  const fullAddress = direccion ? `${direccion}${codigoPostal ? ` (CP ${codigoPostal})` : ''}` : (comunidad || ciudad);

  meetings.push({
    id: `presencial-${index + 1}`,
    name: nombreGrupo || 'Jugadores Anónimos',
    country: pais || 'España',
    city: cityDisplay,
    province: provincia || comunidad || '',
    type: 'presencial',
    dayOfWeek,
    dayName,
    time,
    durationMinutes: 90,
    address: fullAddress,
    contactPhone: telefono || '',
    contactEmail: correo || '',
    notes: `Horario: ${horaRaw}. ${comunidad ? `Zona: ${comunidad}` : ''}`.trim()
  });
});

const tsOutput = `import { Meeting } from '../types';

export const IN_PERSON_MEETINGS: Meeting[] = ${JSON.stringify(meetings, null, 2)};
`;

fs.writeFileSync('./src/data/inPersonMeetings.ts', tsOutput, 'utf8');
console.log(`Generated ${meetings.length} in-person meetings.`);
