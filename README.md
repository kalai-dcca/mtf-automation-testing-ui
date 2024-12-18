# Set up

## Installation

Please install the project dependencies and playwright binaries

```shell
npm install               # installs dependencies
npx playwright install    # installs browser binaries
```

## Executing tests

Make sure to provide the values for the following environment variables

- `URL`: test site url, you can provide default value in codebase
- `TESTUSER`: test site username
- `PASSWORD`: test site password

If you have to provide all three env values:

```shell
URL=YOUR_TEST_SITE_URL TESTUSER=YOUR_USERNAME PASSWORD=YOUR_PASS\
 npx bddgen && npx playwright test
```

If you have provided site url in code bases:

```shell
TESTUSER=YOUR_USERNAME PASSWORD=YOUR_PASS npx bddgen && npx playwright test
```

If you have provided site url, username in the code bases:

```shell
PASSWORD=YOUR_PASS npx bddgen && npx playwright test
```

Please note that passwrod must be provided from externally ( command line in this case) at all times for keeping code base secure.
