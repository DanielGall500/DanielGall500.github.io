---
title: "Voss Machine Translation API"
date: 2021-07-01
draft: false
project_tags: ["Python", "Javascript", "SQLite","FastAPI", "Sacremoses", "GUnicorn", "Locust"]
status: "growing"
summary: "An API for handling Machine Translation Models.<br><br><br>"
weight: 4
---

## Overview
[EUComMeet](https://www.eucommeet.eu/objectives-activities-nutshell/) was a project funded by the European Commission to build a multi-lingual platform for debate among European citizens - as such, it was required to account for a high level of linguistic diversity among those participating in the events. At the ADAPT Research Centre we developed firstly 30 Machine Translation (MT) models to account for 6 European languages and secondly an API built for secure and asynchronous communication between the models hosted on our servers and the platform hosted non-locally. The resulting API, termed Voss, is now available for use by the European commission and was furthermore made open source for others to use in the future. 

## The Voss API
Voss is an API built to securely and efficiently distribute translation requests among machine translation models, typically hosted on other servers. The API is built using Python 3.10 and implemented in FastAPI. This work was carried out at the [ADAPT Research Centre](https://www.adaptcentre.ie/) in Dublin City University for [EUComMeet](https://www.eucommeet.eu/objectives-activities-nutshell/), a completely open-source platform to facilitate discussions among EU citizens on important and current topics. It is currently in use for deliberations on the EUComMeet platform serving translation between six languages: English, German, French, Italian, Polish, and Irish. This API is complementary to earlier work carried out which has been recently published in MDPI Analytics ([Lohar et al, 2023](https://www.mdpi.com/2813-2203/2/2/22)).
The name stems from the influential German translator Johann Heinrich Voss, known for his translations of Homer's Odyssey and Iliad.

{{< mermaid >}}
graph LR;
    VOSS_API((Voss API)) --> MT_Server_A["MT Server A"]
    VOSS_API --> MT_Server_B["MT Server B"]
    VOSS_API --> MT_Server_C["MT Server C"]

    %% MT Server A connections
    MT_Server_A --> GPU_A1["GPU 1:<br>DE to EN, EN to DE,<br>FR to DE, GA to DE,<br>IT to DE, PL to DE"]
    
    %% MT Server B connections
    MT_Server_B --> GPU_B1["GPU 1:<br>DE to IT, EN to IT,<br>FR to IT, GA to IT,<br>IT to GA, PL to GA"]
    MT_Server_B --> GPU_B2["GPU 2:<br>DE to PL, EN to PL,<br>FR to PL, GA to PL,<br>IT to PL, PL to IT"]

    %% MT Server C connections
    MT_Server_C --> GPU_C1["GPU 1:<br>DE to FR, EN to FR,<br>FR to EN, GA to EN,<br>IT to EN, PL to EN"]
    MT_Server_C --> GPU_C2["GPU 2:<br>DE to GA, EN to GA,<br>FR to GA, GA to FR,<br>IT to FR, PL to FR"]
{{< /mermaid >}}

### Built With
The project is built using Python 3.10 and FastAPI, an asynchronous framework for developing APIs. It relies on Gunicorn and Uvicorn to improve performance by creating multiple Uvicorn workers to handle any incoming requests. 

* Server Configuration (SQLite)
    * The server configuration, that is, a table which provides the server name, model ID, and GPU to use for each MT model, is stored in a SQLite database and loaded using ```pysqlite3```, which is then loaded into a Python dictionary upon server startup. Further work on this project would take greater advantage of the features that comes with using SQLite.
* Preprocessing (Sacremoses)
    * Each translation request includes text which must be translated, and this text requires some pre-processing. We decided to handle this on the API side to reduce the load for the translation servers. Tokenization was carried out using ```sacremoses```, a popular tool for language tokenization.
* User Verification (Argon2, JWT)
    * Password creation and authentication uses Argon2 password hashing. Through the ```/login``` endpoint users can verify their authenticity and receive a JSON web token (handled by ```pyjwt```) which then must included in the headers of any translation request made to the server.

Note that Voss does not host the MT models itself, but rather interacts with models that are already hosted. For self-hosting the translation models yourself, please see [OpenNMT MT Server](https://github.com/DanielGall500/OpenNMT-MT-server)
<!-- * [![FastAPI]][FastAPI-url] -->


## Improvements
The first version of this API was used in a pilot test of the EUComMeet project that took place in December of 2022. This pilot allowed us to see ways in which this version was difficult to work with, less than optimally secure, and not as efficient as other potential implementations. Version 2 was released in April 2023 and has made some major revisions. An overview of these revisions you can find below.
There were three primary focuses when developing Version 2:
* Reliability: Working towards eradicating bugs / server down-time. Rebuilding the web server from the ground up allowed for a focus on stronger design patterns. A dashboard has been created so that the current model status for each language pair can be checked at any time, and documentation allows developers to better understand each API endpoint for quicker debugging.
* Speed: Improving the speed of the API so that many more users could theoretically be served without noticeable latency. This involves both hardware and software improvements.
* Security: Steps taken to minimise chance of server security breach and Argon2 encryption of user login details has been implemented.

### Asynchronous Web Server
The API previously relied on Flask and Waitress which provided a WSGI server that could handle requests one at a time. This was changed to FastAPI, an open-source python framework specifically designed for building asynchronous RESTful APIs. This allows for multiple requests to be handled simultaneously and therefore better response times.

### Model Dashboard & Documentation
A dashboard GUI (view here) has been developed which displays the current status of each of the 30 language models, as well as the current translation latency for each model. From this dashboard one can also navigate to the documentation (view here) for the API, which contains the information needed in order to send requests and the types of responses one should expect. Note that without a username and password provided and stored by ADAPT, one cannot carry out any translations.
![Dashboard](resources/live-model-dashboard-example.png)

<!-- CONTACT -->
## More Information
Project Link: [https://github.com/DanielGall500/Voss](https://github.com/DanielGall500/Voss)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/DanielGall500/TranslateAPI.svg?style=for-the-badge
[contributors-url]: https://github.com/DanielGall500/TranslateAPI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DanielGall500/TranslateAPI.svg?style=for-the-badge
[forks-url]: https://github.com/DanielGall500/TranslateAPI/network/members
[stars-shield]: https://img.shields.io/github/stars/DanielGall500/TranslateAPI.svg?style=for-the-badge
[stars-url]: https://github.com/DanielGall500/TranslateAPI/stargazers

[issues-shield]: https://img.shields.io/github/issues/DanielGall500/TranslateAPI.svg?style=for-the-badge
[issues-url]: https://github.com/DanielGall500/TranslateAPI/issues

[license-shield]: https://img.shields.io/github/license/DanielGall500/TranslateAPI.svg?style=for-the-badge
[license-url]: https://github.com/DanielGall500/TranslateAPI/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/daniel-gallagher-a520161a3/

[product-screenshot]: images/screenshot.png

[MDL]: https://img.shields.io/badge/UI-Material%20Design%20Lite-purplehttps://getmdl.io/index.html
[MDL-url]: https://getmdl.io/index.html
[FastAPI]:  https://img.shields.io/badge/API-FastAPI-brightgreen
[FastAPI-url]: https://fastapi.tiangolo.com/
