# Reproducing error for dts-bundle-generator

This repository is meant to reproduce an error in [dts-bundle-generator](https://github.com/timocov/dts-bundle-generator) package. The package
outputs a single `d.ts` file from the given input.

When using the parameter `--inline-declare-externals`, dts-bundle-generator will include the `declare module` statements of global
modules to the type build. Statements like that can be used to extend types provided by third party packages, as is done in
the ReactTable component in this repository for an example.

However, there's a small issue if the type being extended uses generics, such as in this example:

```
import type { RowData } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    stickyFilters?: boolean;
  }
}
```

The `RowData` won't be imported in the build file (assuming it's not used e.g. to type a component) and because of that TypeScript
thinks it doesn't have identical type parameters as the actual type being extended. So basically TypeScript will complain this

```
node_modules/@tanstack/table-core/build/lib/types.d.ts(17,18): error TS2428: All declarations of 'TableMeta' must have identical type parameters.
ReactTable.d.ts(7,12): error TS2428: All declarations of 'TableMeta' must have identical type parameters.
ReactTable.d.ts(7,36): error TS2304: Cannot find name 'RowData'.
```

To reproduce the issue with this repository, simply run these commands in the root:
* `npm install` (assuming you have Node.js and npm installed)
* `npm run build-types`


## Workaround

At least one simple workaround the issue is if you export `RowData` directly from the ReactTable component. That will cause that type
to be imported and exported in the output `d.ts` file.