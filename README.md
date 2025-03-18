
# URL Shortner Style App using DDD (Domain Driven-Design)

Aplicação estilo [LinkTree](https://linktr.ee) para estudo de projeto usando DDD.
## Entities 🆔

- Customer
- Organization
- Collection
- Links



## Requisitos

**_CRUD CLIENTES_**

- [X]  O cliente deve poder se cadastrar;
- [ ]  O cliente deve poder editar seu cadastro;
- [X]  O cliente deve poder visualizar seu perfil;

**_CRUD ORGANIZAÇÕES_**

- [X]  O cliente deve poder cadastrar uma organização; (Necessário 1 para operar no sistema)
- [X]  O cliente deve poder editar uma organização;
- [X]  O cliente deve poder editar o SLUG da organização para um slug personalizado;
- [ ]  O cliente deve poder deletar uma organização;
- [ ]  O cliente deve poder visualizar suas organizações;

**_CRUD COLEÇÕES_**

- [ ]  O cliente deve poder criar uma coleção;
- [ ]  O cliente deve poder deletar uma coleção;
- [ ]  O cliente deve poder editar uma coleção;
- [ ]  O cliente deve poder visualizar suas coleções;

**_CRUD LINKS_**

- [ ]  O cliente deve poder criar um link;
- [ ]  O cliente deve poder editar um link;
- [ ]  O cliente deve poder deletar um link;
- [ ]  O cliente deve poder visualizar seus links;

## RN's (Regras de negócio)

- [X]  O cliente é único por e-mail;
- [X]  O slug é único por organização;
- [ ]  O cliente pode escolher colocar uma coleção em uma organização ou não, caso ele não coloque o status será INACTIVE;
- [ ]  O cliente deve poder escolher se uma coleção é global ou não; (Pode ser usada em 1 ou mais organizações)
- [ ]  O cliente só pode criar links se ele tiver uma coleção cadastrada anteriormente;
- [ ]  O slug pode ser aleatório ou baseado no título da organização;

**_SISTEMA DE PLANOS_**

- [ ]  O cliente pode ter até 5 links por coleção no máximo no plano BÁSICO;
- [ ]  O cliente pode ter até 10 links por coleção no máximo no plano IDEAL;
- [ ]  O cliente pode ter links ilimitados por coleção no máximo no plano AVANÇADO;

- [ ]  O cliente pode ter até 2 organizações no máximo no plano BÁSICO;
- [ ]  O cliente pode ter até 5 organizações no máximo no plano IDEAL;
- [ ]  O cliente pode ter organizações ilimitadas no plano AVANÇADO;

## RNF's (Requisitos não-funcionais)

- [ ]  Os link seguem o padrão de Slug pós a url principal; (nicxz.dev/${slug})
- [ ]  As listas devem estar páginadas com até 20 itens por página;

