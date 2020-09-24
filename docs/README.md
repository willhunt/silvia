# silvia

> Silvia smart espresso machine

## Development

```bash
$ yarn dev
$ yarn docs:build
```

## Deployment

```bash
$ ./deploy
```

If running the above script results in `Error: EACCES: permission denied, unlink <some directory>/<some file>` errors then unlink the `<some directory>` using:

```bash
$ sudo rm -rf <some directory>
```