# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

### Deploy to Strapi Cloud (CLI)

1. **Prerequisites**
   - Google, GitHub, or GitLab account
   - Local Strapi project **&lt; 100MB**
   - Node.js and npm/yarn

2. **Login** (from the `backend` folder):
   ```bash
   npx strapi login
   ```
   A browser window opens; confirm the code and sign in with Google, GitHub, or GitLab.

3. **Deploy**:
   ```bash
   npx strapi deploy
   ```
   This creates a **Free plan** project on Strapi Cloud. Strapi Cloud provides a managed PostgreSQL database; you don’t need to set `DATABASE_*` env vars.

4. **Optional – Auto-deploy on git push**
   - Push your code to GitHub or GitLab.
   - In [Strapi Cloud](https://cloud.strapi.io) → your project → **Settings** → **General**, connect the repository.
   - Enable **“Deploy the project on every commit pushed to this branch”**.

After deployment, use the Cloud dashboard for metrics, env vars, and trigger deploys.

**Enable API for the frontend (fix “content keeps loading”):**  
On a new Strapi Cloud project, the **Public** role has no API permissions. In the Strapi admin of your Cloud project:

1. Open **Settings** (left sidebar) → **Users & Permissions** → **Roles**.
2. Click **Public**.
3. Under **Permissions**, for each content type your frontend uses, enable:
   - **Hero-slide**: `find`, `findOne`
   - **Site-setting**: `find` (single type)
   - **Testimonial**: `find`, `findOne`
   - **Team-member**: `find`, `findOne`
   - **Service**: `find`, `findOne`
   - **Subscriber**: `create` (if the frontend submits the newsletter form)
4. Click **Save**.

After saving, public API calls will succeed and the frontend can load content.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
