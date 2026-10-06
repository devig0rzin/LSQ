# Content Model

A UI deve consumir conteúdo tipado e separado da camada visual.

## Product
- `id`
- `slug`
- `name`
- `code?`
- `categoryId`
- `shortDescription`
- `description?`
- `images[]`
- `applications[]`
- `specGroups[]`
- `downloads[]`
- `badges[]` somente se confirmados
- `featured`
- `sourceStatus`: `confirmed | current-site | matrix-derived | pending-review`

## Category
- `id`
- `slug`
- `name`
- `description?`
- `image?`
- `featured`

## Lead request (beta interface)
- `personType`: `company | individual`
- `name`
- `companyName?`
- `document?`
- `phone`
- `email?`
- `interest?`
- `message?`

## Regra de conteúdo
Nunca usar campos vazios para inventar texto. A UI deve esconder blocos que não têm dados válidos.
