# WorldApp

**WorldApp** е веб апликација за менаџирање на држави и корисници, со целосна автентикација, напишана со Flask (Python) за backend, React за frontend, и MongoDB како база на податоци. Проектот е целосно docker-изиран, оркестриран со Docker Compose и Kubernetes, и содржи автоматски CI/CD pipeline преку GitHub Actions. Дополнително, продукциската верзија е деплојирана на Render cloud платформа.

---

## Содржина

- [Опис](#опис)
- [Технологии и алатки](#технологии-и-алатки)
- [Архитектура](#архитектура)
- [Брз старт (локално)](#брз-старт-локално)
- [Docker Compose](#docker-compose)
- [Kubernetes deployment](#kubernetes-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Production Deploy (Render)](#production-deploy-render)
- [Контакти и придонес](#контакти-и-придонес)

---

## Опис

WorldApp овозможува:
- CRUD операции за држави (create, read, update, delete)
- Регистрација, login и logout на корисници (автентикација)
- Frontend изработен во React, backend во Flask, MongoDB база
- Контенеризација и лесна оркестрација и deployment

---

## Технологии и алатки

- **Backend:** [Flask](https://flask.palletsprojects.com/) (Python)
- **Frontend:** [React](https://react.dev/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Контенеризација:** [Docker](https://www.docker.com/)
- **Оркестрација:** [Docker Compose](https://docs.docker.com/compose/) и [Kubernetes](https://kubernetes.io/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)
- **Cloud Deploy:** [Render](https://render.com/) *(bonus)*
- **Reverse Proxy:** [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
- **IDE:** [PyCharm](https://www.jetbrains.com/pycharm/)
- **Регистар на слики:** [DockerHub](https://hub.docker.com/)
