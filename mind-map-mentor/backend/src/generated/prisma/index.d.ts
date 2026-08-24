
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Note
 * 
 */
export type Note = $Result.DefaultSelection<Prisma.$NotePayload>
/**
 * Model File
 * 
 */
export type File = $Result.DefaultSelection<Prisma.$FilePayload>
/**
 * Model GraphNode
 * 
 */
export type GraphNode = $Result.DefaultSelection<Prisma.$GraphNodePayload>
/**
 * Model GraphEdge
 * 
 */
export type GraphEdge = $Result.DefaultSelection<Prisma.$GraphEdgePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.note.findMany()
    * ```
    */
  get note(): Prisma.NoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.file`: Exposes CRUD operations for the **File** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.file.findMany()
    * ```
    */
  get file(): Prisma.FileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.graphNode`: Exposes CRUD operations for the **GraphNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GraphNodes
    * const graphNodes = await prisma.graphNode.findMany()
    * ```
    */
  get graphNode(): Prisma.GraphNodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.graphEdge`: Exposes CRUD operations for the **GraphEdge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GraphEdges
    * const graphEdges = await prisma.graphEdge.findMany()
    * ```
    */
  get graphEdge(): Prisma.GraphEdgeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Note: 'Note',
    File: 'File',
    GraphNode: 'GraphNode',
    GraphEdge: 'GraphEdge'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "note" | "file" | "graphNode" | "graphEdge"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Note: {
        payload: Prisma.$NotePayload<ExtArgs>
        fields: Prisma.NoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findFirst: {
            args: Prisma.NoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findMany: {
            args: Prisma.NoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          create: {
            args: Prisma.NoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          createMany: {
            args: Prisma.NoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          delete: {
            args: Prisma.NoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          update: {
            args: Prisma.NoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          deleteMany: {
            args: Prisma.NoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          upsert: {
            args: Prisma.NoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          aggregate: {
            args: Prisma.NoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote>
          }
          groupBy: {
            args: Prisma.NoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteCountArgs<ExtArgs>
            result: $Utils.Optional<NoteCountAggregateOutputType> | number
          }
        }
      }
      File: {
        payload: Prisma.$FilePayload<ExtArgs>
        fields: Prisma.FileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          findFirst: {
            args: Prisma.FileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          findMany: {
            args: Prisma.FileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          create: {
            args: Prisma.FileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          createMany: {
            args: Prisma.FileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          delete: {
            args: Prisma.FileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          update: {
            args: Prisma.FileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          deleteMany: {
            args: Prisma.FileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          upsert: {
            args: Prisma.FileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          aggregate: {
            args: Prisma.FileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFile>
          }
          groupBy: {
            args: Prisma.FileGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileCountArgs<ExtArgs>
            result: $Utils.Optional<FileCountAggregateOutputType> | number
          }
        }
      }
      GraphNode: {
        payload: Prisma.$GraphNodePayload<ExtArgs>
        fields: Prisma.GraphNodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GraphNodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GraphNodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          findFirst: {
            args: Prisma.GraphNodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GraphNodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          findMany: {
            args: Prisma.GraphNodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>[]
          }
          create: {
            args: Prisma.GraphNodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          createMany: {
            args: Prisma.GraphNodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GraphNodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>[]
          }
          delete: {
            args: Prisma.GraphNodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          update: {
            args: Prisma.GraphNodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          deleteMany: {
            args: Prisma.GraphNodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GraphNodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GraphNodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>[]
          }
          upsert: {
            args: Prisma.GraphNodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          aggregate: {
            args: Prisma.GraphNodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGraphNode>
          }
          groupBy: {
            args: Prisma.GraphNodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GraphNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GraphNodeCountArgs<ExtArgs>
            result: $Utils.Optional<GraphNodeCountAggregateOutputType> | number
          }
        }
      }
      GraphEdge: {
        payload: Prisma.$GraphEdgePayload<ExtArgs>
        fields: Prisma.GraphEdgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GraphEdgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GraphEdgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          findFirst: {
            args: Prisma.GraphEdgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GraphEdgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          findMany: {
            args: Prisma.GraphEdgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>[]
          }
          create: {
            args: Prisma.GraphEdgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          createMany: {
            args: Prisma.GraphEdgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GraphEdgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>[]
          }
          delete: {
            args: Prisma.GraphEdgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          update: {
            args: Prisma.GraphEdgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          deleteMany: {
            args: Prisma.GraphEdgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GraphEdgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GraphEdgeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>[]
          }
          upsert: {
            args: Prisma.GraphEdgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          aggregate: {
            args: Prisma.GraphEdgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGraphEdge>
          }
          groupBy: {
            args: Prisma.GraphEdgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GraphEdgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GraphEdgeCountArgs<ExtArgs>
            result: $Utils.Optional<GraphEdgeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    note?: NoteOmit
    file?: FileOmit
    graphNode?: GraphNodeOmit
    graphEdge?: GraphEdgeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    notes: number
    files: number
    graphNodes: number
    graphEdges: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | UserCountOutputTypeCountNotesArgs
    files?: boolean | UserCountOutputTypeCountFilesArgs
    graphNodes?: boolean | UserCountOutputTypeCountGraphNodesArgs
    graphEdges?: boolean | UserCountOutputTypeCountGraphEdgesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGraphNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphNodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGraphEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphEdgeWhereInput
  }


  /**
   * Count Type GraphNodeCountOutputType
   */

  export type GraphNodeCountOutputType = {
    files: number
    edgesFrom: number
    edgesTo: number
  }

  export type GraphNodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | GraphNodeCountOutputTypeCountFilesArgs
    edgesFrom?: boolean | GraphNodeCountOutputTypeCountEdgesFromArgs
    edgesTo?: boolean | GraphNodeCountOutputTypeCountEdgesToArgs
  }

  // Custom InputTypes
  /**
   * GraphNodeCountOutputType without action
   */
  export type GraphNodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNodeCountOutputType
     */
    select?: GraphNodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GraphNodeCountOutputType without action
   */
  export type GraphNodeCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }

  /**
   * GraphNodeCountOutputType without action
   */
  export type GraphNodeCountOutputTypeCountEdgesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphEdgeWhereInput
  }

  /**
   * GraphNodeCountOutputType without action
   */
  export type GraphNodeCountOutputTypeCountEdgesToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphEdgeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    fullName: string | null
    hashedPassword: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    fullName: string | null
    hashedPassword: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    fullName: number
    hashedPassword: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    hashedPassword?: true
    isActive?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    hashedPassword?: true
    isActive?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    hashedPassword?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    fullName: string
    hashedPassword: string
    isActive: boolean
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    hashedPassword?: boolean
    isActive?: boolean
    createdAt?: boolean
    notes?: boolean | User$notesArgs<ExtArgs>
    files?: boolean | User$filesArgs<ExtArgs>
    graphNodes?: boolean | User$graphNodesArgs<ExtArgs>
    graphEdges?: boolean | User$graphEdgesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    hashedPassword?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    hashedPassword?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    fullName?: boolean
    hashedPassword?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "fullName" | "hashedPassword" | "isActive" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | User$notesArgs<ExtArgs>
    files?: boolean | User$filesArgs<ExtArgs>
    graphNodes?: boolean | User$graphNodesArgs<ExtArgs>
    graphEdges?: boolean | User$graphEdgesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      notes: Prisma.$NotePayload<ExtArgs>[]
      files: Prisma.$FilePayload<ExtArgs>[]
      graphNodes: Prisma.$GraphNodePayload<ExtArgs>[]
      graphEdges: Prisma.$GraphEdgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      fullName: string
      hashedPassword: string
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends User$notesArgs<ExtArgs> = {}>(args?: Subset<T, User$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    files<T extends User$filesArgs<ExtArgs> = {}>(args?: Subset<T, User$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    graphNodes<T extends User$graphNodesArgs<ExtArgs> = {}>(args?: Subset<T, User$graphNodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    graphEdges<T extends User$graphEdgesArgs<ExtArgs> = {}>(args?: Subset<T, User$graphEdgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly hashedPassword: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.notes
   */
  export type User$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * User.files
   */
  export type User$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * User.graphNodes
   */
  export type User$graphNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    where?: GraphNodeWhereInput
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    cursor?: GraphNodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GraphNodeScalarFieldEnum | GraphNodeScalarFieldEnum[]
  }

  /**
   * User.graphEdges
   */
  export type User$graphEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    where?: GraphEdgeWhereInput
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    cursor?: GraphEdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null
    _avg: NoteAvgAggregateOutputType | null
    _sum: NoteSumAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  export type NoteAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    positionX: number | null
    positionY: number | null
    graphNodeId: number | null
  }

  export type NoteSumAggregateOutputType = {
    id: number | null
    userId: number | null
    positionX: number | null
    positionY: number | null
    graphNodeId: number | null
  }

  export type NoteMinAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    content: string | null
    positionX: number | null
    positionY: number | null
    graphNodeId: number | null
    userSummary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoteMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    content: string | null
    positionX: number | null
    positionY: number | null
    graphNodeId: number | null
    userSummary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoteCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    content: number
    positionX: number
    positionY: number
    graphNodeId: number
    userSummary: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NoteAvgAggregateInputType = {
    id?: true
    userId?: true
    positionX?: true
    positionY?: true
    graphNodeId?: true
  }

  export type NoteSumAggregateInputType = {
    id?: true
    userId?: true
    positionX?: true
    positionY?: true
    graphNodeId?: true
  }

  export type NoteMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    positionX?: true
    positionY?: true
    graphNodeId?: true
    userSummary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoteMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    positionX?: true
    positionY?: true
    graphNodeId?: true
    userSummary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoteCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    positionX?: true
    positionY?: true
    graphNodeId?: true
    userSummary?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Note to aggregate.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notes
    **/
    _count?: true | NoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteMaxAggregateInputType
  }

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
        [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>
  }




  export type NoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithAggregationInput | NoteOrderByWithAggregationInput[]
    by: NoteScalarFieldEnum[] | NoteScalarFieldEnum
    having?: NoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteCountAggregateInputType | true
    _avg?: NoteAvgAggregateInputType
    _sum?: NoteSumAggregateInputType
    _min?: NoteMinAggregateInputType
    _max?: NoteMaxAggregateInputType
  }

  export type NoteGroupByOutputType = {
    id: number
    userId: number
    title: string | null
    content: string
    positionX: number | null
    positionY: number | null
    graphNodeId: number | null
    userSummary: string | null
    createdAt: Date
    updatedAt: Date | null
    _count: NoteCountAggregateOutputType | null
    _avg: NoteAvgAggregateOutputType | null
    _sum: NoteSumAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteGroupByOutputType[P]>
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
        }
      >
    >


  export type NoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    positionX?: boolean
    positionY?: boolean
    graphNodeId?: boolean
    userSummary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | Note$graphNodeArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    positionX?: boolean
    positionY?: boolean
    graphNodeId?: boolean
    userSummary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | Note$graphNodeArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    positionX?: boolean
    positionY?: boolean
    graphNodeId?: boolean
    userSummary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | Note$graphNodeArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    positionX?: boolean
    positionY?: boolean
    graphNodeId?: boolean
    userSummary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "content" | "positionX" | "positionY" | "graphNodeId" | "userSummary" | "createdAt" | "updatedAt", ExtArgs["result"]["note"]>
  export type NoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | Note$graphNodeArgs<ExtArgs>
  }
  export type NoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | Note$graphNodeArgs<ExtArgs>
  }
  export type NoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | Note$graphNodeArgs<ExtArgs>
  }

  export type $NotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Note"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      graphNode: Prisma.$GraphNodePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      title: string | null
      content: string
      positionX: number | null
      positionY: number | null
      graphNodeId: number | null
      userSummary: string | null
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["note"]>
    composites: {}
  }

  type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = $Result.GetResult<Prisma.$NotePayload, S>

  type NoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoteCountAggregateInputType | true
    }

  export interface NoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Note'], meta: { name: 'Note' } }
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteFindUniqueArgs>(args: SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Note that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteFindUniqueOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteFindFirstArgs>(args?: SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteFindManyArgs>(args?: SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     * 
     */
    create<T extends NoteCreateArgs>(args: SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notes.
     * @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteCreateManyArgs>(args?: SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notes and returns the data saved in the database.
     * @param {NoteCreateManyAndReturnArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     * 
     */
    delete<T extends NoteDeleteArgs>(args: SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteUpdateArgs>(args: SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteDeleteManyArgs>(args?: SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteUpdateManyArgs>(args: SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes and returns the data updated in the database.
     * @param {NoteUpdateManyAndReturnArgs} args - Arguments to update many Notes.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NoteUpdateManyAndReturnArgs>(args: SelectSubset<T, NoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     */
    upsert<T extends NoteUpsertArgs>(args: SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoteAggregateArgs>(args: Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs['orderBy'] }
        : { orderBy?: NoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Note model
   */
  readonly fields: NoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    graphNode<T extends Note$graphNodeArgs<ExtArgs> = {}>(args?: Subset<T, Note$graphNodeArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Note model
   */
  interface NoteFieldRefs {
    readonly id: FieldRef<"Note", 'Int'>
    readonly userId: FieldRef<"Note", 'Int'>
    readonly title: FieldRef<"Note", 'String'>
    readonly content: FieldRef<"Note", 'String'>
    readonly positionX: FieldRef<"Note", 'Float'>
    readonly positionY: FieldRef<"Note", 'Float'>
    readonly graphNodeId: FieldRef<"Note", 'Int'>
    readonly userSummary: FieldRef<"Note", 'String'>
    readonly createdAt: FieldRef<"Note", 'DateTime'>
    readonly updatedAt: FieldRef<"Note", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findUniqueOrThrow
   */
  export type NoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findFirstOrThrow
   */
  export type NoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findMany
   */
  export type NoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Notes to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note create
   */
  export type NoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Note.
     */
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>
  }

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Note createManyAndReturn
   */
  export type NoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note update
   */
  export type NoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Note.
     */
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
    /**
     * Choose, which Note to update.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
  }

  /**
   * Note updateManyAndReturn
   */
  export type NoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note upsert
   */
  export type NoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Note to update in case it exists.
     */
    where: NoteWhereUniqueInput
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     */
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
  }

  /**
   * Note delete
   */
  export type NoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter which Note to delete.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notes to delete
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to delete.
     */
    limit?: number
  }

  /**
   * Note.graphNode
   */
  export type Note$graphNodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    where?: GraphNodeWhereInput
  }

  /**
   * Note without action
   */
  export type NoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
  }


  /**
   * Model File
   */

  export type AggregateFile = {
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  export type FileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    size: number | null
    graphNodeId: number | null
  }

  export type FileSumAggregateOutputType = {
    id: number | null
    userId: number | null
    size: bigint | null
    graphNodeId: number | null
  }

  export type FileMinAggregateOutputType = {
    id: number | null
    userId: number | null
    filename: string | null
    storagePath: string | null
    mimeType: string | null
    size: bigint | null
    createdAt: Date | null
    graphNodeId: number | null
  }

  export type FileMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    filename: string | null
    storagePath: string | null
    mimeType: string | null
    size: bigint | null
    createdAt: Date | null
    graphNodeId: number | null
  }

  export type FileCountAggregateOutputType = {
    id: number
    userId: number
    filename: number
    storagePath: number
    mimeType: number
    size: number
    createdAt: number
    graphNodeId: number
    _all: number
  }


  export type FileAvgAggregateInputType = {
    id?: true
    userId?: true
    size?: true
    graphNodeId?: true
  }

  export type FileSumAggregateInputType = {
    id?: true
    userId?: true
    size?: true
    graphNodeId?: true
  }

  export type FileMinAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    storagePath?: true
    mimeType?: true
    size?: true
    createdAt?: true
    graphNodeId?: true
  }

  export type FileMaxAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    storagePath?: true
    mimeType?: true
    size?: true
    createdAt?: true
    graphNodeId?: true
  }

  export type FileCountAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    storagePath?: true
    mimeType?: true
    size?: true
    createdAt?: true
    graphNodeId?: true
    _all?: true
  }

  export type FileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which File to aggregate.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Files
    **/
    _count?: true | FileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileMaxAggregateInputType
  }

  export type GetFileAggregateType<T extends FileAggregateArgs> = {
        [P in keyof T & keyof AggregateFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFile[P]>
      : GetScalarType<T[P], AggregateFile[P]>
  }




  export type FileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
    orderBy?: FileOrderByWithAggregationInput | FileOrderByWithAggregationInput[]
    by: FileScalarFieldEnum[] | FileScalarFieldEnum
    having?: FileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileCountAggregateInputType | true
    _avg?: FileAvgAggregateInputType
    _sum?: FileSumAggregateInputType
    _min?: FileMinAggregateInputType
    _max?: FileMaxAggregateInputType
  }

  export type FileGroupByOutputType = {
    id: number
    userId: number
    filename: string
    storagePath: string
    mimeType: string | null
    size: bigint | null
    createdAt: Date
    graphNodeId: number | null
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  type GetFileGroupByPayload<T extends FileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileGroupByOutputType[P]>
            : GetScalarType<T[P], FileGroupByOutputType[P]>
        }
      >
    >


  export type FileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    storagePath?: boolean
    mimeType?: boolean
    size?: boolean
    createdAt?: boolean
    graphNodeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | File$graphNodeArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>

  export type FileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    storagePath?: boolean
    mimeType?: boolean
    size?: boolean
    createdAt?: boolean
    graphNodeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | File$graphNodeArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>

  export type FileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    storagePath?: boolean
    mimeType?: boolean
    size?: boolean
    createdAt?: boolean
    graphNodeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | File$graphNodeArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>

  export type FileSelectScalar = {
    id?: boolean
    userId?: boolean
    filename?: boolean
    storagePath?: boolean
    mimeType?: boolean
    size?: boolean
    createdAt?: boolean
    graphNodeId?: boolean
  }

  export type FileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "filename" | "storagePath" | "mimeType" | "size" | "createdAt" | "graphNodeId", ExtArgs["result"]["file"]>
  export type FileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | File$graphNodeArgs<ExtArgs>
  }
  export type FileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | File$graphNodeArgs<ExtArgs>
  }
  export type FileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    graphNode?: boolean | File$graphNodeArgs<ExtArgs>
  }

  export type $FilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "File"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      graphNode: Prisma.$GraphNodePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      filename: string
      storagePath: string
      mimeType: string | null
      size: bigint | null
      createdAt: Date
      graphNodeId: number | null
    }, ExtArgs["result"]["file"]>
    composites: {}
  }

  type FileGetPayload<S extends boolean | null | undefined | FileDefaultArgs> = $Result.GetResult<Prisma.$FilePayload, S>

  type FileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FileCountAggregateInputType | true
    }

  export interface FileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['File'], meta: { name: 'File' } }
    /**
     * Find zero or one File that matches the filter.
     * @param {FileFindUniqueArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileFindUniqueArgs>(args: SelectSubset<T, FileFindUniqueArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one File that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FileFindUniqueOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileFindUniqueOrThrowArgs>(args: SelectSubset<T, FileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first File that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileFindFirstArgs>(args?: SelectSubset<T, FileFindFirstArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first File that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileFindFirstOrThrowArgs>(args?: SelectSubset<T, FileFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Files
     * const files = await prisma.file.findMany()
     * 
     * // Get first 10 Files
     * const files = await prisma.file.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileWithIdOnly = await prisma.file.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileFindManyArgs>(args?: SelectSubset<T, FileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a File.
     * @param {FileCreateArgs} args - Arguments to create a File.
     * @example
     * // Create one File
     * const File = await prisma.file.create({
     *   data: {
     *     // ... data to create a File
     *   }
     * })
     * 
     */
    create<T extends FileCreateArgs>(args: SelectSubset<T, FileCreateArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Files.
     * @param {FileCreateManyArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const file = await prisma.file.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileCreateManyArgs>(args?: SelectSubset<T, FileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Files and returns the data saved in the database.
     * @param {FileCreateManyAndReturnArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const file = await prisma.file.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Files and only return the `id`
     * const fileWithIdOnly = await prisma.file.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileCreateManyAndReturnArgs>(args?: SelectSubset<T, FileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a File.
     * @param {FileDeleteArgs} args - Arguments to delete one File.
     * @example
     * // Delete one File
     * const File = await prisma.file.delete({
     *   where: {
     *     // ... filter to delete one File
     *   }
     * })
     * 
     */
    delete<T extends FileDeleteArgs>(args: SelectSubset<T, FileDeleteArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one File.
     * @param {FileUpdateArgs} args - Arguments to update one File.
     * @example
     * // Update one File
     * const file = await prisma.file.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileUpdateArgs>(args: SelectSubset<T, FileUpdateArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Files.
     * @param {FileDeleteManyArgs} args - Arguments to filter Files to delete.
     * @example
     * // Delete a few Files
     * const { count } = await prisma.file.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileDeleteManyArgs>(args?: SelectSubset<T, FileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileUpdateManyArgs>(args: SelectSubset<T, FileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files and returns the data updated in the database.
     * @param {FileUpdateManyAndReturnArgs} args - Arguments to update many Files.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Files and only return the `id`
     * const fileWithIdOnly = await prisma.file.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FileUpdateManyAndReturnArgs>(args: SelectSubset<T, FileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one File.
     * @param {FileUpsertArgs} args - Arguments to update or create a File.
     * @example
     * // Update or create a File
     * const file = await prisma.file.upsert({
     *   create: {
     *     // ... data to create a File
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the File we want to update
     *   }
     * })
     */
    upsert<T extends FileUpsertArgs>(args: SelectSubset<T, FileUpsertArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileCountArgs} args - Arguments to filter Files to count.
     * @example
     * // Count the number of Files
     * const count = await prisma.file.count({
     *   where: {
     *     // ... the filter for the Files we want to count
     *   }
     * })
    **/
    count<T extends FileCountArgs>(
      args?: Subset<T, FileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileAggregateArgs>(args: Subset<T, FileAggregateArgs>): Prisma.PrismaPromise<GetFileAggregateType<T>>

    /**
     * Group by File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileGroupByArgs['orderBy'] }
        : { orderBy?: FileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the File model
   */
  readonly fields: FileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for File.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    graphNode<T extends File$graphNodeArgs<ExtArgs> = {}>(args?: Subset<T, File$graphNodeArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the File model
   */
  interface FileFieldRefs {
    readonly id: FieldRef<"File", 'Int'>
    readonly userId: FieldRef<"File", 'Int'>
    readonly filename: FieldRef<"File", 'String'>
    readonly storagePath: FieldRef<"File", 'String'>
    readonly mimeType: FieldRef<"File", 'String'>
    readonly size: FieldRef<"File", 'BigInt'>
    readonly createdAt: FieldRef<"File", 'DateTime'>
    readonly graphNodeId: FieldRef<"File", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * File findUnique
   */
  export type FileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File findUniqueOrThrow
   */
  export type FileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File findFirst
   */
  export type FileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File findFirstOrThrow
   */
  export type FileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File findMany
   */
  export type FileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File create
   */
  export type FileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The data needed to create a File.
     */
    data: XOR<FileCreateInput, FileUncheckedCreateInput>
  }

  /**
   * File createMany
   */
  export type FileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Files.
     */
    data: FileCreateManyInput | FileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * File createManyAndReturn
   */
  export type FileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * The data used to create many Files.
     */
    data: FileCreateManyInput | FileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * File update
   */
  export type FileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The data needed to update a File.
     */
    data: XOR<FileUpdateInput, FileUncheckedUpdateInput>
    /**
     * Choose, which File to update.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File updateMany
   */
  export type FileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Files.
     */
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     */
    where?: FileWhereInput
    /**
     * Limit how many Files to update.
     */
    limit?: number
  }

  /**
   * File updateManyAndReturn
   */
  export type FileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * The data used to update Files.
     */
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     */
    where?: FileWhereInput
    /**
     * Limit how many Files to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * File upsert
   */
  export type FileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The filter to search for the File to update in case it exists.
     */
    where: FileWhereUniqueInput
    /**
     * In case the File found by the `where` argument doesn't exist, create a new File with this data.
     */
    create: XOR<FileCreateInput, FileUncheckedCreateInput>
    /**
     * In case the File was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileUpdateInput, FileUncheckedUpdateInput>
  }

  /**
   * File delete
   */
  export type FileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter which File to delete.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File deleteMany
   */
  export type FileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Files to delete
     */
    where?: FileWhereInput
    /**
     * Limit how many Files to delete.
     */
    limit?: number
  }

  /**
   * File.graphNode
   */
  export type File$graphNodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    where?: GraphNodeWhereInput
  }

  /**
   * File without action
   */
  export type FileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
  }


  /**
   * Model GraphNode
   */

  export type AggregateGraphNode = {
    _count: GraphNodeCountAggregateOutputType | null
    _avg: GraphNodeAvgAggregateOutputType | null
    _sum: GraphNodeSumAggregateOutputType | null
    _min: GraphNodeMinAggregateOutputType | null
    _max: GraphNodeMaxAggregateOutputType | null
  }

  export type GraphNodeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type GraphNodeSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type GraphNodeMinAggregateOutputType = {
    id: number | null
    userId: number | null
    label: string | null
    nodeType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GraphNodeMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    label: string | null
    nodeType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GraphNodeCountAggregateOutputType = {
    id: number
    userId: number
    label: number
    nodeType: number
    data: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GraphNodeAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type GraphNodeSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type GraphNodeMinAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    nodeType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GraphNodeMaxAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    nodeType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GraphNodeCountAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    nodeType?: true
    data?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GraphNodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GraphNode to aggregate.
     */
    where?: GraphNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphNodes to fetch.
     */
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GraphNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GraphNodes
    **/
    _count?: true | GraphNodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GraphNodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GraphNodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GraphNodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GraphNodeMaxAggregateInputType
  }

  export type GetGraphNodeAggregateType<T extends GraphNodeAggregateArgs> = {
        [P in keyof T & keyof AggregateGraphNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGraphNode[P]>
      : GetScalarType<T[P], AggregateGraphNode[P]>
  }




  export type GraphNodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphNodeWhereInput
    orderBy?: GraphNodeOrderByWithAggregationInput | GraphNodeOrderByWithAggregationInput[]
    by: GraphNodeScalarFieldEnum[] | GraphNodeScalarFieldEnum
    having?: GraphNodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GraphNodeCountAggregateInputType | true
    _avg?: GraphNodeAvgAggregateInputType
    _sum?: GraphNodeSumAggregateInputType
    _min?: GraphNodeMinAggregateInputType
    _max?: GraphNodeMaxAggregateInputType
  }

  export type GraphNodeGroupByOutputType = {
    id: number
    userId: number
    label: string | null
    nodeType: string
    data: JsonValue | null
    position: JsonValue | null
    createdAt: Date
    updatedAt: Date | null
    _count: GraphNodeCountAggregateOutputType | null
    _avg: GraphNodeAvgAggregateOutputType | null
    _sum: GraphNodeSumAggregateOutputType | null
    _min: GraphNodeMinAggregateOutputType | null
    _max: GraphNodeMaxAggregateOutputType | null
  }

  type GetGraphNodeGroupByPayload<T extends GraphNodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GraphNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GraphNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GraphNodeGroupByOutputType[P]>
            : GetScalarType<T[P], GraphNodeGroupByOutputType[P]>
        }
      >
    >


  export type GraphNodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    label?: boolean
    nodeType?: boolean
    data?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | GraphNode$noteArgs<ExtArgs>
    files?: boolean | GraphNode$filesArgs<ExtArgs>
    edgesFrom?: boolean | GraphNode$edgesFromArgs<ExtArgs>
    edgesTo?: boolean | GraphNode$edgesToArgs<ExtArgs>
    _count?: boolean | GraphNodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphNode"]>

  export type GraphNodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    label?: boolean
    nodeType?: boolean
    data?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphNode"]>

  export type GraphNodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    label?: boolean
    nodeType?: boolean
    data?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphNode"]>

  export type GraphNodeSelectScalar = {
    id?: boolean
    userId?: boolean
    label?: boolean
    nodeType?: boolean
    data?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GraphNodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "label" | "nodeType" | "data" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["graphNode"]>
  export type GraphNodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    note?: boolean | GraphNode$noteArgs<ExtArgs>
    files?: boolean | GraphNode$filesArgs<ExtArgs>
    edgesFrom?: boolean | GraphNode$edgesFromArgs<ExtArgs>
    edgesTo?: boolean | GraphNode$edgesToArgs<ExtArgs>
    _count?: boolean | GraphNodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GraphNodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GraphNodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GraphNodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GraphNode"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      note: Prisma.$NotePayload<ExtArgs> | null
      files: Prisma.$FilePayload<ExtArgs>[]
      edgesFrom: Prisma.$GraphEdgePayload<ExtArgs>[]
      edgesTo: Prisma.$GraphEdgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      label: string | null
      nodeType: string
      data: Prisma.JsonValue | null
      position: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["graphNode"]>
    composites: {}
  }

  type GraphNodeGetPayload<S extends boolean | null | undefined | GraphNodeDefaultArgs> = $Result.GetResult<Prisma.$GraphNodePayload, S>

  type GraphNodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GraphNodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GraphNodeCountAggregateInputType | true
    }

  export interface GraphNodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GraphNode'], meta: { name: 'GraphNode' } }
    /**
     * Find zero or one GraphNode that matches the filter.
     * @param {GraphNodeFindUniqueArgs} args - Arguments to find a GraphNode
     * @example
     * // Get one GraphNode
     * const graphNode = await prisma.graphNode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GraphNodeFindUniqueArgs>(args: SelectSubset<T, GraphNodeFindUniqueArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GraphNode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GraphNodeFindUniqueOrThrowArgs} args - Arguments to find a GraphNode
     * @example
     * // Get one GraphNode
     * const graphNode = await prisma.graphNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GraphNodeFindUniqueOrThrowArgs>(args: SelectSubset<T, GraphNodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GraphNode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeFindFirstArgs} args - Arguments to find a GraphNode
     * @example
     * // Get one GraphNode
     * const graphNode = await prisma.graphNode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GraphNodeFindFirstArgs>(args?: SelectSubset<T, GraphNodeFindFirstArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GraphNode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeFindFirstOrThrowArgs} args - Arguments to find a GraphNode
     * @example
     * // Get one GraphNode
     * const graphNode = await prisma.graphNode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GraphNodeFindFirstOrThrowArgs>(args?: SelectSubset<T, GraphNodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GraphNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GraphNodes
     * const graphNodes = await prisma.graphNode.findMany()
     * 
     * // Get first 10 GraphNodes
     * const graphNodes = await prisma.graphNode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const graphNodeWithIdOnly = await prisma.graphNode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GraphNodeFindManyArgs>(args?: SelectSubset<T, GraphNodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GraphNode.
     * @param {GraphNodeCreateArgs} args - Arguments to create a GraphNode.
     * @example
     * // Create one GraphNode
     * const GraphNode = await prisma.graphNode.create({
     *   data: {
     *     // ... data to create a GraphNode
     *   }
     * })
     * 
     */
    create<T extends GraphNodeCreateArgs>(args: SelectSubset<T, GraphNodeCreateArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GraphNodes.
     * @param {GraphNodeCreateManyArgs} args - Arguments to create many GraphNodes.
     * @example
     * // Create many GraphNodes
     * const graphNode = await prisma.graphNode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GraphNodeCreateManyArgs>(args?: SelectSubset<T, GraphNodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GraphNodes and returns the data saved in the database.
     * @param {GraphNodeCreateManyAndReturnArgs} args - Arguments to create many GraphNodes.
     * @example
     * // Create many GraphNodes
     * const graphNode = await prisma.graphNode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GraphNodes and only return the `id`
     * const graphNodeWithIdOnly = await prisma.graphNode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GraphNodeCreateManyAndReturnArgs>(args?: SelectSubset<T, GraphNodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GraphNode.
     * @param {GraphNodeDeleteArgs} args - Arguments to delete one GraphNode.
     * @example
     * // Delete one GraphNode
     * const GraphNode = await prisma.graphNode.delete({
     *   where: {
     *     // ... filter to delete one GraphNode
     *   }
     * })
     * 
     */
    delete<T extends GraphNodeDeleteArgs>(args: SelectSubset<T, GraphNodeDeleteArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GraphNode.
     * @param {GraphNodeUpdateArgs} args - Arguments to update one GraphNode.
     * @example
     * // Update one GraphNode
     * const graphNode = await prisma.graphNode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GraphNodeUpdateArgs>(args: SelectSubset<T, GraphNodeUpdateArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GraphNodes.
     * @param {GraphNodeDeleteManyArgs} args - Arguments to filter GraphNodes to delete.
     * @example
     * // Delete a few GraphNodes
     * const { count } = await prisma.graphNode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GraphNodeDeleteManyArgs>(args?: SelectSubset<T, GraphNodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GraphNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GraphNodes
     * const graphNode = await prisma.graphNode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GraphNodeUpdateManyArgs>(args: SelectSubset<T, GraphNodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GraphNodes and returns the data updated in the database.
     * @param {GraphNodeUpdateManyAndReturnArgs} args - Arguments to update many GraphNodes.
     * @example
     * // Update many GraphNodes
     * const graphNode = await prisma.graphNode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GraphNodes and only return the `id`
     * const graphNodeWithIdOnly = await prisma.graphNode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GraphNodeUpdateManyAndReturnArgs>(args: SelectSubset<T, GraphNodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GraphNode.
     * @param {GraphNodeUpsertArgs} args - Arguments to update or create a GraphNode.
     * @example
     * // Update or create a GraphNode
     * const graphNode = await prisma.graphNode.upsert({
     *   create: {
     *     // ... data to create a GraphNode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GraphNode we want to update
     *   }
     * })
     */
    upsert<T extends GraphNodeUpsertArgs>(args: SelectSubset<T, GraphNodeUpsertArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GraphNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeCountArgs} args - Arguments to filter GraphNodes to count.
     * @example
     * // Count the number of GraphNodes
     * const count = await prisma.graphNode.count({
     *   where: {
     *     // ... the filter for the GraphNodes we want to count
     *   }
     * })
    **/
    count<T extends GraphNodeCountArgs>(
      args?: Subset<T, GraphNodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GraphNodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GraphNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GraphNodeAggregateArgs>(args: Subset<T, GraphNodeAggregateArgs>): Prisma.PrismaPromise<GetGraphNodeAggregateType<T>>

    /**
     * Group by GraphNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GraphNodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GraphNodeGroupByArgs['orderBy'] }
        : { orderBy?: GraphNodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GraphNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGraphNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GraphNode model
   */
  readonly fields: GraphNodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GraphNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GraphNodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    note<T extends GraphNode$noteArgs<ExtArgs> = {}>(args?: Subset<T, GraphNode$noteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    files<T extends GraphNode$filesArgs<ExtArgs> = {}>(args?: Subset<T, GraphNode$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    edgesFrom<T extends GraphNode$edgesFromArgs<ExtArgs> = {}>(args?: Subset<T, GraphNode$edgesFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    edgesTo<T extends GraphNode$edgesToArgs<ExtArgs> = {}>(args?: Subset<T, GraphNode$edgesToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GraphNode model
   */
  interface GraphNodeFieldRefs {
    readonly id: FieldRef<"GraphNode", 'Int'>
    readonly userId: FieldRef<"GraphNode", 'Int'>
    readonly label: FieldRef<"GraphNode", 'String'>
    readonly nodeType: FieldRef<"GraphNode", 'String'>
    readonly data: FieldRef<"GraphNode", 'Json'>
    readonly position: FieldRef<"GraphNode", 'Json'>
    readonly createdAt: FieldRef<"GraphNode", 'DateTime'>
    readonly updatedAt: FieldRef<"GraphNode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GraphNode findUnique
   */
  export type GraphNodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNode to fetch.
     */
    where: GraphNodeWhereUniqueInput
  }

  /**
   * GraphNode findUniqueOrThrow
   */
  export type GraphNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNode to fetch.
     */
    where: GraphNodeWhereUniqueInput
  }

  /**
   * GraphNode findFirst
   */
  export type GraphNodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNode to fetch.
     */
    where?: GraphNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphNodes to fetch.
     */
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GraphNodes.
     */
    cursor?: GraphNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphNodes.
     */
    distinct?: GraphNodeScalarFieldEnum | GraphNodeScalarFieldEnum[]
  }

  /**
   * GraphNode findFirstOrThrow
   */
  export type GraphNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNode to fetch.
     */
    where?: GraphNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphNodes to fetch.
     */
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GraphNodes.
     */
    cursor?: GraphNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphNodes.
     */
    distinct?: GraphNodeScalarFieldEnum | GraphNodeScalarFieldEnum[]
  }

  /**
   * GraphNode findMany
   */
  export type GraphNodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNodes to fetch.
     */
    where?: GraphNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphNodes to fetch.
     */
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GraphNodes.
     */
    cursor?: GraphNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphNodes.
     */
    distinct?: GraphNodeScalarFieldEnum | GraphNodeScalarFieldEnum[]
  }

  /**
   * GraphNode create
   */
  export type GraphNodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * The data needed to create a GraphNode.
     */
    data: XOR<GraphNodeCreateInput, GraphNodeUncheckedCreateInput>
  }

  /**
   * GraphNode createMany
   */
  export type GraphNodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GraphNodes.
     */
    data: GraphNodeCreateManyInput | GraphNodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GraphNode createManyAndReturn
   */
  export type GraphNodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * The data used to create many GraphNodes.
     */
    data: GraphNodeCreateManyInput | GraphNodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GraphNode update
   */
  export type GraphNodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * The data needed to update a GraphNode.
     */
    data: XOR<GraphNodeUpdateInput, GraphNodeUncheckedUpdateInput>
    /**
     * Choose, which GraphNode to update.
     */
    where: GraphNodeWhereUniqueInput
  }

  /**
   * GraphNode updateMany
   */
  export type GraphNodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GraphNodes.
     */
    data: XOR<GraphNodeUpdateManyMutationInput, GraphNodeUncheckedUpdateManyInput>
    /**
     * Filter which GraphNodes to update
     */
    where?: GraphNodeWhereInput
    /**
     * Limit how many GraphNodes to update.
     */
    limit?: number
  }

  /**
   * GraphNode updateManyAndReturn
   */
  export type GraphNodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * The data used to update GraphNodes.
     */
    data: XOR<GraphNodeUpdateManyMutationInput, GraphNodeUncheckedUpdateManyInput>
    /**
     * Filter which GraphNodes to update
     */
    where?: GraphNodeWhereInput
    /**
     * Limit how many GraphNodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GraphNode upsert
   */
  export type GraphNodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * The filter to search for the GraphNode to update in case it exists.
     */
    where: GraphNodeWhereUniqueInput
    /**
     * In case the GraphNode found by the `where` argument doesn't exist, create a new GraphNode with this data.
     */
    create: XOR<GraphNodeCreateInput, GraphNodeUncheckedCreateInput>
    /**
     * In case the GraphNode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GraphNodeUpdateInput, GraphNodeUncheckedUpdateInput>
  }

  /**
   * GraphNode delete
   */
  export type GraphNodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter which GraphNode to delete.
     */
    where: GraphNodeWhereUniqueInput
  }

  /**
   * GraphNode deleteMany
   */
  export type GraphNodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GraphNodes to delete
     */
    where?: GraphNodeWhereInput
    /**
     * Limit how many GraphNodes to delete.
     */
    limit?: number
  }

  /**
   * GraphNode.note
   */
  export type GraphNode$noteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
  }

  /**
   * GraphNode.files
   */
  export type GraphNode$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * GraphNode.edgesFrom
   */
  export type GraphNode$edgesFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    where?: GraphEdgeWhereInput
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    cursor?: GraphEdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphNode.edgesTo
   */
  export type GraphNode$edgesToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    where?: GraphEdgeWhereInput
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    cursor?: GraphEdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphNode without action
   */
  export type GraphNodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphNode
     */
    omit?: GraphNodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
  }


  /**
   * Model GraphEdge
   */

  export type AggregateGraphEdge = {
    _count: GraphEdgeCountAggregateOutputType | null
    _avg: GraphEdgeAvgAggregateOutputType | null
    _sum: GraphEdgeSumAggregateOutputType | null
    _min: GraphEdgeMinAggregateOutputType | null
    _max: GraphEdgeMaxAggregateOutputType | null
  }

  export type GraphEdgeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceNodeId: number | null
    targetNodeId: number | null
  }

  export type GraphEdgeSumAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceNodeId: number | null
    targetNodeId: number | null
  }

  export type GraphEdgeMinAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceNodeId: number | null
    targetNodeId: number | null
    relationshipType: string | null
    label: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GraphEdgeMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceNodeId: number | null
    targetNodeId: number | null
    relationshipType: string | null
    label: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GraphEdgeCountAggregateOutputType = {
    id: number
    userId: number
    sourceNodeId: number
    targetNodeId: number
    relationshipType: number
    label: number
    data: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GraphEdgeAvgAggregateInputType = {
    id?: true
    userId?: true
    sourceNodeId?: true
    targetNodeId?: true
  }

  export type GraphEdgeSumAggregateInputType = {
    id?: true
    userId?: true
    sourceNodeId?: true
    targetNodeId?: true
  }

  export type GraphEdgeMinAggregateInputType = {
    id?: true
    userId?: true
    sourceNodeId?: true
    targetNodeId?: true
    relationshipType?: true
    label?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GraphEdgeMaxAggregateInputType = {
    id?: true
    userId?: true
    sourceNodeId?: true
    targetNodeId?: true
    relationshipType?: true
    label?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GraphEdgeCountAggregateInputType = {
    id?: true
    userId?: true
    sourceNodeId?: true
    targetNodeId?: true
    relationshipType?: true
    label?: true
    data?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GraphEdgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GraphEdge to aggregate.
     */
    where?: GraphEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphEdges to fetch.
     */
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GraphEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GraphEdges
    **/
    _count?: true | GraphEdgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GraphEdgeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GraphEdgeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GraphEdgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GraphEdgeMaxAggregateInputType
  }

  export type GetGraphEdgeAggregateType<T extends GraphEdgeAggregateArgs> = {
        [P in keyof T & keyof AggregateGraphEdge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGraphEdge[P]>
      : GetScalarType<T[P], AggregateGraphEdge[P]>
  }




  export type GraphEdgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphEdgeWhereInput
    orderBy?: GraphEdgeOrderByWithAggregationInput | GraphEdgeOrderByWithAggregationInput[]
    by: GraphEdgeScalarFieldEnum[] | GraphEdgeScalarFieldEnum
    having?: GraphEdgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GraphEdgeCountAggregateInputType | true
    _avg?: GraphEdgeAvgAggregateInputType
    _sum?: GraphEdgeSumAggregateInputType
    _min?: GraphEdgeMinAggregateInputType
    _max?: GraphEdgeMaxAggregateInputType
  }

  export type GraphEdgeGroupByOutputType = {
    id: number
    userId: number
    sourceNodeId: number
    targetNodeId: number
    relationshipType: string | null
    label: string | null
    data: JsonValue | null
    createdAt: Date
    updatedAt: Date | null
    _count: GraphEdgeCountAggregateOutputType | null
    _avg: GraphEdgeAvgAggregateOutputType | null
    _sum: GraphEdgeSumAggregateOutputType | null
    _min: GraphEdgeMinAggregateOutputType | null
    _max: GraphEdgeMaxAggregateOutputType | null
  }

  type GetGraphEdgeGroupByPayload<T extends GraphEdgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GraphEdgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GraphEdgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GraphEdgeGroupByOutputType[P]>
            : GetScalarType<T[P], GraphEdgeGroupByOutputType[P]>
        }
      >
    >


  export type GraphEdgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceNodeId?: boolean
    targetNodeId?: boolean
    relationshipType?: boolean
    label?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
    targetNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphEdge"]>

  export type GraphEdgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceNodeId?: boolean
    targetNodeId?: boolean
    relationshipType?: boolean
    label?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
    targetNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphEdge"]>

  export type GraphEdgeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceNodeId?: boolean
    targetNodeId?: boolean
    relationshipType?: boolean
    label?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
    targetNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphEdge"]>

  export type GraphEdgeSelectScalar = {
    id?: boolean
    userId?: boolean
    sourceNodeId?: boolean
    targetNodeId?: boolean
    relationshipType?: boolean
    label?: boolean
    data?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GraphEdgeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sourceNodeId" | "targetNodeId" | "relationshipType" | "label" | "data" | "createdAt" | "updatedAt", ExtArgs["result"]["graphEdge"]>
  export type GraphEdgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
    targetNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }
  export type GraphEdgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
    targetNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }
  export type GraphEdgeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sourceNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
    targetNode?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }

  export type $GraphEdgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GraphEdge"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      sourceNode: Prisma.$GraphNodePayload<ExtArgs>
      targetNode: Prisma.$GraphNodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      sourceNodeId: number
      targetNodeId: number
      relationshipType: string | null
      label: string | null
      data: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["graphEdge"]>
    composites: {}
  }

  type GraphEdgeGetPayload<S extends boolean | null | undefined | GraphEdgeDefaultArgs> = $Result.GetResult<Prisma.$GraphEdgePayload, S>

  type GraphEdgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GraphEdgeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GraphEdgeCountAggregateInputType | true
    }

  export interface GraphEdgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GraphEdge'], meta: { name: 'GraphEdge' } }
    /**
     * Find zero or one GraphEdge that matches the filter.
     * @param {GraphEdgeFindUniqueArgs} args - Arguments to find a GraphEdge
     * @example
     * // Get one GraphEdge
     * const graphEdge = await prisma.graphEdge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GraphEdgeFindUniqueArgs>(args: SelectSubset<T, GraphEdgeFindUniqueArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GraphEdge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GraphEdgeFindUniqueOrThrowArgs} args - Arguments to find a GraphEdge
     * @example
     * // Get one GraphEdge
     * const graphEdge = await prisma.graphEdge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GraphEdgeFindUniqueOrThrowArgs>(args: SelectSubset<T, GraphEdgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GraphEdge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeFindFirstArgs} args - Arguments to find a GraphEdge
     * @example
     * // Get one GraphEdge
     * const graphEdge = await prisma.graphEdge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GraphEdgeFindFirstArgs>(args?: SelectSubset<T, GraphEdgeFindFirstArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GraphEdge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeFindFirstOrThrowArgs} args - Arguments to find a GraphEdge
     * @example
     * // Get one GraphEdge
     * const graphEdge = await prisma.graphEdge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GraphEdgeFindFirstOrThrowArgs>(args?: SelectSubset<T, GraphEdgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GraphEdges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GraphEdges
     * const graphEdges = await prisma.graphEdge.findMany()
     * 
     * // Get first 10 GraphEdges
     * const graphEdges = await prisma.graphEdge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const graphEdgeWithIdOnly = await prisma.graphEdge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GraphEdgeFindManyArgs>(args?: SelectSubset<T, GraphEdgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GraphEdge.
     * @param {GraphEdgeCreateArgs} args - Arguments to create a GraphEdge.
     * @example
     * // Create one GraphEdge
     * const GraphEdge = await prisma.graphEdge.create({
     *   data: {
     *     // ... data to create a GraphEdge
     *   }
     * })
     * 
     */
    create<T extends GraphEdgeCreateArgs>(args: SelectSubset<T, GraphEdgeCreateArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GraphEdges.
     * @param {GraphEdgeCreateManyArgs} args - Arguments to create many GraphEdges.
     * @example
     * // Create many GraphEdges
     * const graphEdge = await prisma.graphEdge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GraphEdgeCreateManyArgs>(args?: SelectSubset<T, GraphEdgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GraphEdges and returns the data saved in the database.
     * @param {GraphEdgeCreateManyAndReturnArgs} args - Arguments to create many GraphEdges.
     * @example
     * // Create many GraphEdges
     * const graphEdge = await prisma.graphEdge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GraphEdges and only return the `id`
     * const graphEdgeWithIdOnly = await prisma.graphEdge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GraphEdgeCreateManyAndReturnArgs>(args?: SelectSubset<T, GraphEdgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GraphEdge.
     * @param {GraphEdgeDeleteArgs} args - Arguments to delete one GraphEdge.
     * @example
     * // Delete one GraphEdge
     * const GraphEdge = await prisma.graphEdge.delete({
     *   where: {
     *     // ... filter to delete one GraphEdge
     *   }
     * })
     * 
     */
    delete<T extends GraphEdgeDeleteArgs>(args: SelectSubset<T, GraphEdgeDeleteArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GraphEdge.
     * @param {GraphEdgeUpdateArgs} args - Arguments to update one GraphEdge.
     * @example
     * // Update one GraphEdge
     * const graphEdge = await prisma.graphEdge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GraphEdgeUpdateArgs>(args: SelectSubset<T, GraphEdgeUpdateArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GraphEdges.
     * @param {GraphEdgeDeleteManyArgs} args - Arguments to filter GraphEdges to delete.
     * @example
     * // Delete a few GraphEdges
     * const { count } = await prisma.graphEdge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GraphEdgeDeleteManyArgs>(args?: SelectSubset<T, GraphEdgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GraphEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GraphEdges
     * const graphEdge = await prisma.graphEdge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GraphEdgeUpdateManyArgs>(args: SelectSubset<T, GraphEdgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GraphEdges and returns the data updated in the database.
     * @param {GraphEdgeUpdateManyAndReturnArgs} args - Arguments to update many GraphEdges.
     * @example
     * // Update many GraphEdges
     * const graphEdge = await prisma.graphEdge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GraphEdges and only return the `id`
     * const graphEdgeWithIdOnly = await prisma.graphEdge.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GraphEdgeUpdateManyAndReturnArgs>(args: SelectSubset<T, GraphEdgeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GraphEdge.
     * @param {GraphEdgeUpsertArgs} args - Arguments to update or create a GraphEdge.
     * @example
     * // Update or create a GraphEdge
     * const graphEdge = await prisma.graphEdge.upsert({
     *   create: {
     *     // ... data to create a GraphEdge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GraphEdge we want to update
     *   }
     * })
     */
    upsert<T extends GraphEdgeUpsertArgs>(args: SelectSubset<T, GraphEdgeUpsertArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GraphEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeCountArgs} args - Arguments to filter GraphEdges to count.
     * @example
     * // Count the number of GraphEdges
     * const count = await prisma.graphEdge.count({
     *   where: {
     *     // ... the filter for the GraphEdges we want to count
     *   }
     * })
    **/
    count<T extends GraphEdgeCountArgs>(
      args?: Subset<T, GraphEdgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GraphEdgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GraphEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GraphEdgeAggregateArgs>(args: Subset<T, GraphEdgeAggregateArgs>): Prisma.PrismaPromise<GetGraphEdgeAggregateType<T>>

    /**
     * Group by GraphEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GraphEdgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GraphEdgeGroupByArgs['orderBy'] }
        : { orderBy?: GraphEdgeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GraphEdgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGraphEdgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GraphEdge model
   */
  readonly fields: GraphEdgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GraphEdge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GraphEdgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sourceNode<T extends GraphNodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GraphNodeDefaultArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    targetNode<T extends GraphNodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GraphNodeDefaultArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GraphEdge model
   */
  interface GraphEdgeFieldRefs {
    readonly id: FieldRef<"GraphEdge", 'Int'>
    readonly userId: FieldRef<"GraphEdge", 'Int'>
    readonly sourceNodeId: FieldRef<"GraphEdge", 'Int'>
    readonly targetNodeId: FieldRef<"GraphEdge", 'Int'>
    readonly relationshipType: FieldRef<"GraphEdge", 'String'>
    readonly label: FieldRef<"GraphEdge", 'String'>
    readonly data: FieldRef<"GraphEdge", 'Json'>
    readonly createdAt: FieldRef<"GraphEdge", 'DateTime'>
    readonly updatedAt: FieldRef<"GraphEdge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GraphEdge findUnique
   */
  export type GraphEdgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdge to fetch.
     */
    where: GraphEdgeWhereUniqueInput
  }

  /**
   * GraphEdge findUniqueOrThrow
   */
  export type GraphEdgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdge to fetch.
     */
    where: GraphEdgeWhereUniqueInput
  }

  /**
   * GraphEdge findFirst
   */
  export type GraphEdgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdge to fetch.
     */
    where?: GraphEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphEdges to fetch.
     */
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GraphEdges.
     */
    cursor?: GraphEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphEdges.
     */
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphEdge findFirstOrThrow
   */
  export type GraphEdgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdge to fetch.
     */
    where?: GraphEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphEdges to fetch.
     */
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GraphEdges.
     */
    cursor?: GraphEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphEdges.
     */
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphEdge findMany
   */
  export type GraphEdgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdges to fetch.
     */
    where?: GraphEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphEdges to fetch.
     */
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GraphEdges.
     */
    cursor?: GraphEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphEdges.
     */
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphEdge create
   */
  export type GraphEdgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * The data needed to create a GraphEdge.
     */
    data: XOR<GraphEdgeCreateInput, GraphEdgeUncheckedCreateInput>
  }

  /**
   * GraphEdge createMany
   */
  export type GraphEdgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GraphEdges.
     */
    data: GraphEdgeCreateManyInput | GraphEdgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GraphEdge createManyAndReturn
   */
  export type GraphEdgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * The data used to create many GraphEdges.
     */
    data: GraphEdgeCreateManyInput | GraphEdgeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GraphEdge update
   */
  export type GraphEdgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * The data needed to update a GraphEdge.
     */
    data: XOR<GraphEdgeUpdateInput, GraphEdgeUncheckedUpdateInput>
    /**
     * Choose, which GraphEdge to update.
     */
    where: GraphEdgeWhereUniqueInput
  }

  /**
   * GraphEdge updateMany
   */
  export type GraphEdgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GraphEdges.
     */
    data: XOR<GraphEdgeUpdateManyMutationInput, GraphEdgeUncheckedUpdateManyInput>
    /**
     * Filter which GraphEdges to update
     */
    where?: GraphEdgeWhereInput
    /**
     * Limit how many GraphEdges to update.
     */
    limit?: number
  }

  /**
   * GraphEdge updateManyAndReturn
   */
  export type GraphEdgeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * The data used to update GraphEdges.
     */
    data: XOR<GraphEdgeUpdateManyMutationInput, GraphEdgeUncheckedUpdateManyInput>
    /**
     * Filter which GraphEdges to update
     */
    where?: GraphEdgeWhereInput
    /**
     * Limit how many GraphEdges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GraphEdge upsert
   */
  export type GraphEdgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * The filter to search for the GraphEdge to update in case it exists.
     */
    where: GraphEdgeWhereUniqueInput
    /**
     * In case the GraphEdge found by the `where` argument doesn't exist, create a new GraphEdge with this data.
     */
    create: XOR<GraphEdgeCreateInput, GraphEdgeUncheckedCreateInput>
    /**
     * In case the GraphEdge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GraphEdgeUpdateInput, GraphEdgeUncheckedUpdateInput>
  }

  /**
   * GraphEdge delete
   */
  export type GraphEdgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter which GraphEdge to delete.
     */
    where: GraphEdgeWhereUniqueInput
  }

  /**
   * GraphEdge deleteMany
   */
  export type GraphEdgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GraphEdges to delete
     */
    where?: GraphEdgeWhereInput
    /**
     * Limit how many GraphEdges to delete.
     */
    limit?: number
  }

  /**
   * GraphEdge without action
   */
  export type GraphEdgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GraphEdge
     */
    omit?: GraphEdgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    fullName: 'fullName',
    hashedPassword: 'hashedPassword',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const NoteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    content: 'content',
    positionX: 'positionX',
    positionY: 'positionY',
    graphNodeId: 'graphNodeId',
    userSummary: 'userSummary',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum]


  export const FileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    filename: 'filename',
    storagePath: 'storagePath',
    mimeType: 'mimeType',
    size: 'size',
    createdAt: 'createdAt',
    graphNodeId: 'graphNodeId'
  };

  export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum]


  export const GraphNodeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    label: 'label',
    nodeType: 'nodeType',
    data: 'data',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GraphNodeScalarFieldEnum = (typeof GraphNodeScalarFieldEnum)[keyof typeof GraphNodeScalarFieldEnum]


  export const GraphEdgeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sourceNodeId: 'sourceNodeId',
    targetNodeId: 'targetNodeId',
    relationshipType: 'relationshipType',
    label: 'label',
    data: 'data',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GraphEdgeScalarFieldEnum = (typeof GraphEdgeScalarFieldEnum)[keyof typeof GraphEdgeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    hashedPassword?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    notes?: NoteListRelationFilter
    files?: FileListRelationFilter
    graphNodes?: GraphNodeListRelationFilter
    graphEdges?: GraphEdgeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    notes?: NoteOrderByRelationAggregateInput
    files?: FileOrderByRelationAggregateInput
    graphNodes?: GraphNodeOrderByRelationAggregateInput
    graphEdges?: GraphEdgeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    hashedPassword?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    notes?: NoteListRelationFilter
    files?: FileListRelationFilter
    graphNodes?: GraphNodeListRelationFilter
    graphEdges?: GraphEdgeListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    hashedPassword?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type NoteWhereInput = {
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    id?: IntFilter<"Note"> | number
    userId?: IntFilter<"Note"> | number
    title?: StringNullableFilter<"Note"> | string | null
    content?: StringFilter<"Note"> | string
    positionX?: FloatNullableFilter<"Note"> | number | null
    positionY?: FloatNullableFilter<"Note"> | number | null
    graphNodeId?: IntNullableFilter<"Note"> | number | null
    userSummary?: StringNullableFilter<"Note"> | string | null
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Note"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    graphNode?: XOR<GraphNodeNullableScalarRelationFilter, GraphNodeWhereInput> | null
  }

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrder
    positionX?: SortOrderInput | SortOrder
    positionY?: SortOrderInput | SortOrder
    graphNodeId?: SortOrderInput | SortOrder
    userSummary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    graphNode?: GraphNodeOrderByWithRelationInput
  }

  export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    graphNodeId?: number
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    userId?: IntFilter<"Note"> | number
    title?: StringNullableFilter<"Note"> | string | null
    content?: StringFilter<"Note"> | string
    positionX?: FloatNullableFilter<"Note"> | number | null
    positionY?: FloatNullableFilter<"Note"> | number | null
    userSummary?: StringNullableFilter<"Note"> | string | null
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Note"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    graphNode?: XOR<GraphNodeNullableScalarRelationFilter, GraphNodeWhereInput> | null
  }, "id" | "graphNodeId">

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrder
    positionX?: SortOrderInput | SortOrder
    positionY?: SortOrderInput | SortOrder
    graphNodeId?: SortOrderInput | SortOrder
    userSummary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: NoteCountOrderByAggregateInput
    _avg?: NoteAvgOrderByAggregateInput
    _max?: NoteMaxOrderByAggregateInput
    _min?: NoteMinOrderByAggregateInput
    _sum?: NoteSumOrderByAggregateInput
  }

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    OR?: NoteScalarWhereWithAggregatesInput[]
    NOT?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Note"> | number
    userId?: IntWithAggregatesFilter<"Note"> | number
    title?: StringNullableWithAggregatesFilter<"Note"> | string | null
    content?: StringWithAggregatesFilter<"Note"> | string
    positionX?: FloatNullableWithAggregatesFilter<"Note"> | number | null
    positionY?: FloatNullableWithAggregatesFilter<"Note"> | number | null
    graphNodeId?: IntNullableWithAggregatesFilter<"Note"> | number | null
    userSummary?: StringNullableWithAggregatesFilter<"Note"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Note"> | Date | string | null
  }

  export type FileWhereInput = {
    AND?: FileWhereInput | FileWhereInput[]
    OR?: FileWhereInput[]
    NOT?: FileWhereInput | FileWhereInput[]
    id?: IntFilter<"File"> | number
    userId?: IntFilter<"File"> | number
    filename?: StringFilter<"File"> | string
    storagePath?: StringFilter<"File"> | string
    mimeType?: StringNullableFilter<"File"> | string | null
    size?: BigIntNullableFilter<"File"> | bigint | number | null
    createdAt?: DateTimeFilter<"File"> | Date | string
    graphNodeId?: IntNullableFilter<"File"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    graphNode?: XOR<GraphNodeNullableScalarRelationFilter, GraphNodeWhereInput> | null
  }

  export type FileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    storagePath?: SortOrder
    mimeType?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    graphNodeId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    graphNode?: GraphNodeOrderByWithRelationInput
  }

  export type FileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    storagePath?: string
    AND?: FileWhereInput | FileWhereInput[]
    OR?: FileWhereInput[]
    NOT?: FileWhereInput | FileWhereInput[]
    userId?: IntFilter<"File"> | number
    filename?: StringFilter<"File"> | string
    mimeType?: StringNullableFilter<"File"> | string | null
    size?: BigIntNullableFilter<"File"> | bigint | number | null
    createdAt?: DateTimeFilter<"File"> | Date | string
    graphNodeId?: IntNullableFilter<"File"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    graphNode?: XOR<GraphNodeNullableScalarRelationFilter, GraphNodeWhereInput> | null
  }, "id" | "storagePath">

  export type FileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    storagePath?: SortOrder
    mimeType?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    graphNodeId?: SortOrderInput | SortOrder
    _count?: FileCountOrderByAggregateInput
    _avg?: FileAvgOrderByAggregateInput
    _max?: FileMaxOrderByAggregateInput
    _min?: FileMinOrderByAggregateInput
    _sum?: FileSumOrderByAggregateInput
  }

  export type FileScalarWhereWithAggregatesInput = {
    AND?: FileScalarWhereWithAggregatesInput | FileScalarWhereWithAggregatesInput[]
    OR?: FileScalarWhereWithAggregatesInput[]
    NOT?: FileScalarWhereWithAggregatesInput | FileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"File"> | number
    userId?: IntWithAggregatesFilter<"File"> | number
    filename?: StringWithAggregatesFilter<"File"> | string
    storagePath?: StringWithAggregatesFilter<"File"> | string
    mimeType?: StringNullableWithAggregatesFilter<"File"> | string | null
    size?: BigIntNullableWithAggregatesFilter<"File"> | bigint | number | null
    createdAt?: DateTimeWithAggregatesFilter<"File"> | Date | string
    graphNodeId?: IntNullableWithAggregatesFilter<"File"> | number | null
  }

  export type GraphNodeWhereInput = {
    AND?: GraphNodeWhereInput | GraphNodeWhereInput[]
    OR?: GraphNodeWhereInput[]
    NOT?: GraphNodeWhereInput | GraphNodeWhereInput[]
    id?: IntFilter<"GraphNode"> | number
    userId?: IntFilter<"GraphNode"> | number
    label?: StringNullableFilter<"GraphNode"> | string | null
    nodeType?: StringFilter<"GraphNode"> | string
    data?: JsonNullableFilter<"GraphNode">
    position?: JsonNullableFilter<"GraphNode">
    createdAt?: DateTimeFilter<"GraphNode"> | Date | string
    updatedAt?: DateTimeNullableFilter<"GraphNode"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    note?: XOR<NoteNullableScalarRelationFilter, NoteWhereInput> | null
    files?: FileListRelationFilter
    edgesFrom?: GraphEdgeListRelationFilter
    edgesTo?: GraphEdgeListRelationFilter
  }

  export type GraphNodeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrderInput | SortOrder
    nodeType?: SortOrder
    data?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    note?: NoteOrderByWithRelationInput
    files?: FileOrderByRelationAggregateInput
    edgesFrom?: GraphEdgeOrderByRelationAggregateInput
    edgesTo?: GraphEdgeOrderByRelationAggregateInput
  }

  export type GraphNodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GraphNodeWhereInput | GraphNodeWhereInput[]
    OR?: GraphNodeWhereInput[]
    NOT?: GraphNodeWhereInput | GraphNodeWhereInput[]
    userId?: IntFilter<"GraphNode"> | number
    label?: StringNullableFilter<"GraphNode"> | string | null
    nodeType?: StringFilter<"GraphNode"> | string
    data?: JsonNullableFilter<"GraphNode">
    position?: JsonNullableFilter<"GraphNode">
    createdAt?: DateTimeFilter<"GraphNode"> | Date | string
    updatedAt?: DateTimeNullableFilter<"GraphNode"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    note?: XOR<NoteNullableScalarRelationFilter, NoteWhereInput> | null
    files?: FileListRelationFilter
    edgesFrom?: GraphEdgeListRelationFilter
    edgesTo?: GraphEdgeListRelationFilter
  }, "id">

  export type GraphNodeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrderInput | SortOrder
    nodeType?: SortOrder
    data?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: GraphNodeCountOrderByAggregateInput
    _avg?: GraphNodeAvgOrderByAggregateInput
    _max?: GraphNodeMaxOrderByAggregateInput
    _min?: GraphNodeMinOrderByAggregateInput
    _sum?: GraphNodeSumOrderByAggregateInput
  }

  export type GraphNodeScalarWhereWithAggregatesInput = {
    AND?: GraphNodeScalarWhereWithAggregatesInput | GraphNodeScalarWhereWithAggregatesInput[]
    OR?: GraphNodeScalarWhereWithAggregatesInput[]
    NOT?: GraphNodeScalarWhereWithAggregatesInput | GraphNodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GraphNode"> | number
    userId?: IntWithAggregatesFilter<"GraphNode"> | number
    label?: StringNullableWithAggregatesFilter<"GraphNode"> | string | null
    nodeType?: StringWithAggregatesFilter<"GraphNode"> | string
    data?: JsonNullableWithAggregatesFilter<"GraphNode">
    position?: JsonNullableWithAggregatesFilter<"GraphNode">
    createdAt?: DateTimeWithAggregatesFilter<"GraphNode"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"GraphNode"> | Date | string | null
  }

  export type GraphEdgeWhereInput = {
    AND?: GraphEdgeWhereInput | GraphEdgeWhereInput[]
    OR?: GraphEdgeWhereInput[]
    NOT?: GraphEdgeWhereInput | GraphEdgeWhereInput[]
    id?: IntFilter<"GraphEdge"> | number
    userId?: IntFilter<"GraphEdge"> | number
    sourceNodeId?: IntFilter<"GraphEdge"> | number
    targetNodeId?: IntFilter<"GraphEdge"> | number
    relationshipType?: StringNullableFilter<"GraphEdge"> | string | null
    label?: StringNullableFilter<"GraphEdge"> | string | null
    data?: JsonNullableFilter<"GraphEdge">
    createdAt?: DateTimeFilter<"GraphEdge"> | Date | string
    updatedAt?: DateTimeNullableFilter<"GraphEdge"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sourceNode?: XOR<GraphNodeScalarRelationFilter, GraphNodeWhereInput>
    targetNode?: XOR<GraphNodeScalarRelationFilter, GraphNodeWhereInput>
  }

  export type GraphEdgeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceNodeId?: SortOrder
    targetNodeId?: SortOrder
    relationshipType?: SortOrderInput | SortOrder
    label?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    sourceNode?: GraphNodeOrderByWithRelationInput
    targetNode?: GraphNodeOrderByWithRelationInput
  }

  export type GraphEdgeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GraphEdgeWhereInput | GraphEdgeWhereInput[]
    OR?: GraphEdgeWhereInput[]
    NOT?: GraphEdgeWhereInput | GraphEdgeWhereInput[]
    userId?: IntFilter<"GraphEdge"> | number
    sourceNodeId?: IntFilter<"GraphEdge"> | number
    targetNodeId?: IntFilter<"GraphEdge"> | number
    relationshipType?: StringNullableFilter<"GraphEdge"> | string | null
    label?: StringNullableFilter<"GraphEdge"> | string | null
    data?: JsonNullableFilter<"GraphEdge">
    createdAt?: DateTimeFilter<"GraphEdge"> | Date | string
    updatedAt?: DateTimeNullableFilter<"GraphEdge"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sourceNode?: XOR<GraphNodeScalarRelationFilter, GraphNodeWhereInput>
    targetNode?: XOR<GraphNodeScalarRelationFilter, GraphNodeWhereInput>
  }, "id">

  export type GraphEdgeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceNodeId?: SortOrder
    targetNodeId?: SortOrder
    relationshipType?: SortOrderInput | SortOrder
    label?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: GraphEdgeCountOrderByAggregateInput
    _avg?: GraphEdgeAvgOrderByAggregateInput
    _max?: GraphEdgeMaxOrderByAggregateInput
    _min?: GraphEdgeMinOrderByAggregateInput
    _sum?: GraphEdgeSumOrderByAggregateInput
  }

  export type GraphEdgeScalarWhereWithAggregatesInput = {
    AND?: GraphEdgeScalarWhereWithAggregatesInput | GraphEdgeScalarWhereWithAggregatesInput[]
    OR?: GraphEdgeScalarWhereWithAggregatesInput[]
    NOT?: GraphEdgeScalarWhereWithAggregatesInput | GraphEdgeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GraphEdge"> | number
    userId?: IntWithAggregatesFilter<"GraphEdge"> | number
    sourceNodeId?: IntWithAggregatesFilter<"GraphEdge"> | number
    targetNodeId?: IntWithAggregatesFilter<"GraphEdge"> | number
    relationshipType?: StringNullableWithAggregatesFilter<"GraphEdge"> | string | null
    label?: StringNullableWithAggregatesFilter<"GraphEdge"> | string | null
    data?: JsonNullableWithAggregatesFilter<"GraphEdge">
    createdAt?: DateTimeWithAggregatesFilter<"GraphEdge"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"GraphEdge"> | Date | string | null
  }

  export type UserCreateInput = {
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    graphNodes?: GraphNodeCreateNestedManyWithoutUserInput
    graphEdges?: GraphEdgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    graphNodes?: GraphNodeUncheckedCreateNestedManyWithoutUserInput
    graphEdges?: GraphEdgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    graphNodes?: GraphNodeUpdateManyWithoutUserNestedInput
    graphEdges?: GraphEdgeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    graphNodes?: GraphNodeUncheckedUpdateManyWithoutUserNestedInput
    graphEdges?: GraphEdgeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateInput = {
    title?: string | null
    content: string
    positionX?: number | null
    positionY?: number | null
    userSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutNotesInput
    graphNode?: GraphNodeCreateNestedOneWithoutNoteInput
  }

  export type NoteUncheckedCreateInput = {
    id?: number
    userId: number
    title?: string | null
    content: string
    positionX?: number | null
    positionY?: number | null
    graphNodeId?: number | null
    userSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type NoteUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutNotesNestedInput
    graphNode?: GraphNodeUpdateOneWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    graphNodeId?: NullableIntFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NoteCreateManyInput = {
    id?: number
    userId: number
    title?: string | null
    content: string
    positionX?: number | null
    positionY?: number | null
    graphNodeId?: number | null
    userSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type NoteUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    graphNodeId?: NullableIntFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileCreateInput = {
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFilesInput
    graphNode?: GraphNodeCreateNestedOneWithoutFilesInput
  }

  export type FileUncheckedCreateInput = {
    id?: number
    userId: number
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
    graphNodeId?: number | null
  }

  export type FileUpdateInput = {
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFilesNestedInput
    graphNode?: GraphNodeUpdateOneWithoutFilesNestedInput
  }

  export type FileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    graphNodeId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FileCreateManyInput = {
    id?: number
    userId: number
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
    graphNodeId?: number | null
  }

  export type FileUpdateManyMutationInput = {
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    graphNodeId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GraphNodeCreateInput = {
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGraphNodesInput
    note?: NoteCreateNestedOneWithoutGraphNodeInput
    files?: FileCreateNestedManyWithoutGraphNodeInput
    edgesFrom?: GraphEdgeCreateNestedManyWithoutSourceNodeInput
    edgesTo?: GraphEdgeCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeUncheckedCreateInput = {
    id?: number
    userId: number
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    note?: NoteUncheckedCreateNestedOneWithoutGraphNodeInput
    files?: FileUncheckedCreateNestedManyWithoutGraphNodeInput
    edgesFrom?: GraphEdgeUncheckedCreateNestedManyWithoutSourceNodeInput
    edgesTo?: GraphEdgeUncheckedCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeUpdateInput = {
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGraphNodesNestedInput
    note?: NoteUpdateOneWithoutGraphNodeNestedInput
    files?: FileUpdateManyWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUpdateManyWithoutSourceNodeNestedInput
    edgesTo?: GraphEdgeUpdateManyWithoutTargetNodeNestedInput
  }

  export type GraphNodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NoteUncheckedUpdateOneWithoutGraphNodeNestedInput
    files?: FileUncheckedUpdateManyWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUncheckedUpdateManyWithoutSourceNodeNestedInput
    edgesTo?: GraphEdgeUncheckedUpdateManyWithoutTargetNodeNestedInput
  }

  export type GraphNodeCreateManyInput = {
    id?: number
    userId: number
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type GraphNodeUpdateManyMutationInput = {
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphNodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphEdgeCreateInput = {
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGraphEdgesInput
    sourceNode: GraphNodeCreateNestedOneWithoutEdgesFromInput
    targetNode: GraphNodeCreateNestedOneWithoutEdgesToInput
  }

  export type GraphEdgeUncheckedCreateInput = {
    id?: number
    userId: number
    sourceNodeId: number
    targetNodeId: number
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type GraphEdgeUpdateInput = {
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGraphEdgesNestedInput
    sourceNode?: GraphNodeUpdateOneRequiredWithoutEdgesFromNestedInput
    targetNode?: GraphNodeUpdateOneRequiredWithoutEdgesToNestedInput
  }

  export type GraphEdgeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceNodeId?: IntFieldUpdateOperationsInput | number
    targetNodeId?: IntFieldUpdateOperationsInput | number
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphEdgeCreateManyInput = {
    id?: number
    userId: number
    sourceNodeId: number
    targetNodeId: number
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type GraphEdgeUpdateManyMutationInput = {
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphEdgeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceNodeId?: IntFieldUpdateOperationsInput | number
    targetNodeId?: IntFieldUpdateOperationsInput | number
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NoteListRelationFilter = {
    every?: NoteWhereInput
    some?: NoteWhereInput
    none?: NoteWhereInput
  }

  export type FileListRelationFilter = {
    every?: FileWhereInput
    some?: FileWhereInput
    none?: FileWhereInput
  }

  export type GraphNodeListRelationFilter = {
    every?: GraphNodeWhereInput
    some?: GraphNodeWhereInput
    none?: GraphNodeWhereInput
  }

  export type GraphEdgeListRelationFilter = {
    every?: GraphEdgeWhereInput
    some?: GraphEdgeWhereInput
    none?: GraphEdgeWhereInput
  }

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GraphNodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GraphEdgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GraphNodeNullableScalarRelationFilter = {
    is?: GraphNodeWhereInput | null
    isNot?: GraphNodeWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    graphNodeId?: SortOrder
    userSummary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    graphNodeId?: SortOrder
  }

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    graphNodeId?: SortOrder
    userSummary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    graphNodeId?: SortOrder
    userSummary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    graphNodeId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type FileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    storagePath?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    graphNodeId?: SortOrder
  }

  export type FileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    size?: SortOrder
    graphNodeId?: SortOrder
  }

  export type FileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    storagePath?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    graphNodeId?: SortOrder
  }

  export type FileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    storagePath?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    graphNodeId?: SortOrder
  }

  export type FileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    size?: SortOrder
    graphNodeId?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NoteNullableScalarRelationFilter = {
    is?: NoteWhereInput | null
    isNot?: NoteWhereInput | null
  }

  export type GraphNodeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    nodeType?: SortOrder
    data?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GraphNodeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type GraphNodeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    nodeType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GraphNodeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    nodeType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GraphNodeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type GraphNodeScalarRelationFilter = {
    is?: GraphNodeWhereInput
    isNot?: GraphNodeWhereInput
  }

  export type GraphEdgeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceNodeId?: SortOrder
    targetNodeId?: SortOrder
    relationshipType?: SortOrder
    label?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GraphEdgeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceNodeId?: SortOrder
    targetNodeId?: SortOrder
  }

  export type GraphEdgeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceNodeId?: SortOrder
    targetNodeId?: SortOrder
    relationshipType?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GraphEdgeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceNodeId?: SortOrder
    targetNodeId?: SortOrder
    relationshipType?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GraphEdgeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceNodeId?: SortOrder
    targetNodeId?: SortOrder
  }

  export type NoteCreateNestedManyWithoutUserInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type FileCreateNestedManyWithoutUserInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput> | FileCreateWithoutUserInput[] | FileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUserInput | FileCreateOrConnectWithoutUserInput[]
    createMany?: FileCreateManyUserInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type GraphNodeCreateNestedManyWithoutUserInput = {
    create?: XOR<GraphNodeCreateWithoutUserInput, GraphNodeUncheckedCreateWithoutUserInput> | GraphNodeCreateWithoutUserInput[] | GraphNodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GraphNodeCreateOrConnectWithoutUserInput | GraphNodeCreateOrConnectWithoutUserInput[]
    createMany?: GraphNodeCreateManyUserInputEnvelope
    connect?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
  }

  export type GraphEdgeCreateNestedManyWithoutUserInput = {
    create?: XOR<GraphEdgeCreateWithoutUserInput, GraphEdgeUncheckedCreateWithoutUserInput> | GraphEdgeCreateWithoutUserInput[] | GraphEdgeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutUserInput | GraphEdgeCreateOrConnectWithoutUserInput[]
    createMany?: GraphEdgeCreateManyUserInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type FileUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput> | FileCreateWithoutUserInput[] | FileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUserInput | FileCreateOrConnectWithoutUserInput[]
    createMany?: FileCreateManyUserInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type GraphNodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GraphNodeCreateWithoutUserInput, GraphNodeUncheckedCreateWithoutUserInput> | GraphNodeCreateWithoutUserInput[] | GraphNodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GraphNodeCreateOrConnectWithoutUserInput | GraphNodeCreateOrConnectWithoutUserInput[]
    createMany?: GraphNodeCreateManyUserInputEnvelope
    connect?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
  }

  export type GraphEdgeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GraphEdgeCreateWithoutUserInput, GraphEdgeUncheckedCreateWithoutUserInput> | GraphEdgeCreateWithoutUserInput[] | GraphEdgeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutUserInput | GraphEdgeCreateOrConnectWithoutUserInput[]
    createMany?: GraphEdgeCreateManyUserInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutUserInput | NoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutUserInput | NoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutUserInput | NoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type FileUpdateManyWithoutUserNestedInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput> | FileCreateWithoutUserInput[] | FileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUserInput | FileCreateOrConnectWithoutUserInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUserInput | FileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FileCreateManyUserInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUserInput | FileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUserInput | FileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type GraphNodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<GraphNodeCreateWithoutUserInput, GraphNodeUncheckedCreateWithoutUserInput> | GraphNodeCreateWithoutUserInput[] | GraphNodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GraphNodeCreateOrConnectWithoutUserInput | GraphNodeCreateOrConnectWithoutUserInput[]
    upsert?: GraphNodeUpsertWithWhereUniqueWithoutUserInput | GraphNodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GraphNodeCreateManyUserInputEnvelope
    set?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
    disconnect?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
    delete?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
    connect?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
    update?: GraphNodeUpdateWithWhereUniqueWithoutUserInput | GraphNodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GraphNodeUpdateManyWithWhereWithoutUserInput | GraphNodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GraphNodeScalarWhereInput | GraphNodeScalarWhereInput[]
  }

  export type GraphEdgeUpdateManyWithoutUserNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutUserInput, GraphEdgeUncheckedCreateWithoutUserInput> | GraphEdgeCreateWithoutUserInput[] | GraphEdgeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutUserInput | GraphEdgeCreateOrConnectWithoutUserInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutUserInput | GraphEdgeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GraphEdgeCreateManyUserInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutUserInput | GraphEdgeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutUserInput | GraphEdgeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutUserInput | NoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutUserInput | NoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutUserInput | NoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type FileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput> | FileCreateWithoutUserInput[] | FileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUserInput | FileCreateOrConnectWithoutUserInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUserInput | FileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FileCreateManyUserInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUserInput | FileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUserInput | FileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type GraphNodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GraphNodeCreateWithoutUserInput, GraphNodeUncheckedCreateWithoutUserInput> | GraphNodeCreateWithoutUserInput[] | GraphNodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GraphNodeCreateOrConnectWithoutUserInput | GraphNodeCreateOrConnectWithoutUserInput[]
    upsert?: GraphNodeUpsertWithWhereUniqueWithoutUserInput | GraphNodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GraphNodeCreateManyUserInputEnvelope
    set?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
    disconnect?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
    delete?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
    connect?: GraphNodeWhereUniqueInput | GraphNodeWhereUniqueInput[]
    update?: GraphNodeUpdateWithWhereUniqueWithoutUserInput | GraphNodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GraphNodeUpdateManyWithWhereWithoutUserInput | GraphNodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GraphNodeScalarWhereInput | GraphNodeScalarWhereInput[]
  }

  export type GraphEdgeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutUserInput, GraphEdgeUncheckedCreateWithoutUserInput> | GraphEdgeCreateWithoutUserInput[] | GraphEdgeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutUserInput | GraphEdgeCreateOrConnectWithoutUserInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutUserInput | GraphEdgeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GraphEdgeCreateManyUserInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutUserInput | GraphEdgeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutUserInput | GraphEdgeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNotesInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    connect?: UserWhereUniqueInput
  }

  export type GraphNodeCreateNestedOneWithoutNoteInput = {
    create?: XOR<GraphNodeCreateWithoutNoteInput, GraphNodeUncheckedCreateWithoutNoteInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutNoteInput
    connect?: GraphNodeWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    upsert?: UserUpsertWithoutNotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotesInput, UserUpdateWithoutNotesInput>, UserUncheckedUpdateWithoutNotesInput>
  }

  export type GraphNodeUpdateOneWithoutNoteNestedInput = {
    create?: XOR<GraphNodeCreateWithoutNoteInput, GraphNodeUncheckedCreateWithoutNoteInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutNoteInput
    upsert?: GraphNodeUpsertWithoutNoteInput
    disconnect?: GraphNodeWhereInput | boolean
    delete?: GraphNodeWhereInput | boolean
    connect?: GraphNodeWhereUniqueInput
    update?: XOR<XOR<GraphNodeUpdateToOneWithWhereWithoutNoteInput, GraphNodeUpdateWithoutNoteInput>, GraphNodeUncheckedUpdateWithoutNoteInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutFilesInput = {
    create?: XOR<UserCreateWithoutFilesInput, UserUncheckedCreateWithoutFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFilesInput
    connect?: UserWhereUniqueInput
  }

  export type GraphNodeCreateNestedOneWithoutFilesInput = {
    create?: XOR<GraphNodeCreateWithoutFilesInput, GraphNodeUncheckedCreateWithoutFilesInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutFilesInput
    connect?: GraphNodeWhereUniqueInput
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserUpdateOneRequiredWithoutFilesNestedInput = {
    create?: XOR<UserCreateWithoutFilesInput, UserUncheckedCreateWithoutFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFilesInput
    upsert?: UserUpsertWithoutFilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFilesInput, UserUpdateWithoutFilesInput>, UserUncheckedUpdateWithoutFilesInput>
  }

  export type GraphNodeUpdateOneWithoutFilesNestedInput = {
    create?: XOR<GraphNodeCreateWithoutFilesInput, GraphNodeUncheckedCreateWithoutFilesInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutFilesInput
    upsert?: GraphNodeUpsertWithoutFilesInput
    disconnect?: GraphNodeWhereInput | boolean
    delete?: GraphNodeWhereInput | boolean
    connect?: GraphNodeWhereUniqueInput
    update?: XOR<XOR<GraphNodeUpdateToOneWithWhereWithoutFilesInput, GraphNodeUpdateWithoutFilesInput>, GraphNodeUncheckedUpdateWithoutFilesInput>
  }

  export type UserCreateNestedOneWithoutGraphNodesInput = {
    create?: XOR<UserCreateWithoutGraphNodesInput, UserUncheckedCreateWithoutGraphNodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGraphNodesInput
    connect?: UserWhereUniqueInput
  }

  export type NoteCreateNestedOneWithoutGraphNodeInput = {
    create?: XOR<NoteCreateWithoutGraphNodeInput, NoteUncheckedCreateWithoutGraphNodeInput>
    connectOrCreate?: NoteCreateOrConnectWithoutGraphNodeInput
    connect?: NoteWhereUniqueInput
  }

  export type FileCreateNestedManyWithoutGraphNodeInput = {
    create?: XOR<FileCreateWithoutGraphNodeInput, FileUncheckedCreateWithoutGraphNodeInput> | FileCreateWithoutGraphNodeInput[] | FileUncheckedCreateWithoutGraphNodeInput[]
    connectOrCreate?: FileCreateOrConnectWithoutGraphNodeInput | FileCreateOrConnectWithoutGraphNodeInput[]
    createMany?: FileCreateManyGraphNodeInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type GraphEdgeCreateNestedManyWithoutSourceNodeInput = {
    create?: XOR<GraphEdgeCreateWithoutSourceNodeInput, GraphEdgeUncheckedCreateWithoutSourceNodeInput> | GraphEdgeCreateWithoutSourceNodeInput[] | GraphEdgeUncheckedCreateWithoutSourceNodeInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutSourceNodeInput | GraphEdgeCreateOrConnectWithoutSourceNodeInput[]
    createMany?: GraphEdgeCreateManySourceNodeInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type GraphEdgeCreateNestedManyWithoutTargetNodeInput = {
    create?: XOR<GraphEdgeCreateWithoutTargetNodeInput, GraphEdgeUncheckedCreateWithoutTargetNodeInput> | GraphEdgeCreateWithoutTargetNodeInput[] | GraphEdgeUncheckedCreateWithoutTargetNodeInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutTargetNodeInput | GraphEdgeCreateOrConnectWithoutTargetNodeInput[]
    createMany?: GraphEdgeCreateManyTargetNodeInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedOneWithoutGraphNodeInput = {
    create?: XOR<NoteCreateWithoutGraphNodeInput, NoteUncheckedCreateWithoutGraphNodeInput>
    connectOrCreate?: NoteCreateOrConnectWithoutGraphNodeInput
    connect?: NoteWhereUniqueInput
  }

  export type FileUncheckedCreateNestedManyWithoutGraphNodeInput = {
    create?: XOR<FileCreateWithoutGraphNodeInput, FileUncheckedCreateWithoutGraphNodeInput> | FileCreateWithoutGraphNodeInput[] | FileUncheckedCreateWithoutGraphNodeInput[]
    connectOrCreate?: FileCreateOrConnectWithoutGraphNodeInput | FileCreateOrConnectWithoutGraphNodeInput[]
    createMany?: FileCreateManyGraphNodeInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type GraphEdgeUncheckedCreateNestedManyWithoutSourceNodeInput = {
    create?: XOR<GraphEdgeCreateWithoutSourceNodeInput, GraphEdgeUncheckedCreateWithoutSourceNodeInput> | GraphEdgeCreateWithoutSourceNodeInput[] | GraphEdgeUncheckedCreateWithoutSourceNodeInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutSourceNodeInput | GraphEdgeCreateOrConnectWithoutSourceNodeInput[]
    createMany?: GraphEdgeCreateManySourceNodeInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type GraphEdgeUncheckedCreateNestedManyWithoutTargetNodeInput = {
    create?: XOR<GraphEdgeCreateWithoutTargetNodeInput, GraphEdgeUncheckedCreateWithoutTargetNodeInput> | GraphEdgeCreateWithoutTargetNodeInput[] | GraphEdgeUncheckedCreateWithoutTargetNodeInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutTargetNodeInput | GraphEdgeCreateOrConnectWithoutTargetNodeInput[]
    createMany?: GraphEdgeCreateManyTargetNodeInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutGraphNodesNestedInput = {
    create?: XOR<UserCreateWithoutGraphNodesInput, UserUncheckedCreateWithoutGraphNodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGraphNodesInput
    upsert?: UserUpsertWithoutGraphNodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGraphNodesInput, UserUpdateWithoutGraphNodesInput>, UserUncheckedUpdateWithoutGraphNodesInput>
  }

  export type NoteUpdateOneWithoutGraphNodeNestedInput = {
    create?: XOR<NoteCreateWithoutGraphNodeInput, NoteUncheckedCreateWithoutGraphNodeInput>
    connectOrCreate?: NoteCreateOrConnectWithoutGraphNodeInput
    upsert?: NoteUpsertWithoutGraphNodeInput
    disconnect?: NoteWhereInput | boolean
    delete?: NoteWhereInput | boolean
    connect?: NoteWhereUniqueInput
    update?: XOR<XOR<NoteUpdateToOneWithWhereWithoutGraphNodeInput, NoteUpdateWithoutGraphNodeInput>, NoteUncheckedUpdateWithoutGraphNodeInput>
  }

  export type FileUpdateManyWithoutGraphNodeNestedInput = {
    create?: XOR<FileCreateWithoutGraphNodeInput, FileUncheckedCreateWithoutGraphNodeInput> | FileCreateWithoutGraphNodeInput[] | FileUncheckedCreateWithoutGraphNodeInput[]
    connectOrCreate?: FileCreateOrConnectWithoutGraphNodeInput | FileCreateOrConnectWithoutGraphNodeInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutGraphNodeInput | FileUpsertWithWhereUniqueWithoutGraphNodeInput[]
    createMany?: FileCreateManyGraphNodeInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutGraphNodeInput | FileUpdateWithWhereUniqueWithoutGraphNodeInput[]
    updateMany?: FileUpdateManyWithWhereWithoutGraphNodeInput | FileUpdateManyWithWhereWithoutGraphNodeInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type GraphEdgeUpdateManyWithoutSourceNodeNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutSourceNodeInput, GraphEdgeUncheckedCreateWithoutSourceNodeInput> | GraphEdgeCreateWithoutSourceNodeInput[] | GraphEdgeUncheckedCreateWithoutSourceNodeInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutSourceNodeInput | GraphEdgeCreateOrConnectWithoutSourceNodeInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutSourceNodeInput | GraphEdgeUpsertWithWhereUniqueWithoutSourceNodeInput[]
    createMany?: GraphEdgeCreateManySourceNodeInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutSourceNodeInput | GraphEdgeUpdateWithWhereUniqueWithoutSourceNodeInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutSourceNodeInput | GraphEdgeUpdateManyWithWhereWithoutSourceNodeInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type GraphEdgeUpdateManyWithoutTargetNodeNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutTargetNodeInput, GraphEdgeUncheckedCreateWithoutTargetNodeInput> | GraphEdgeCreateWithoutTargetNodeInput[] | GraphEdgeUncheckedCreateWithoutTargetNodeInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutTargetNodeInput | GraphEdgeCreateOrConnectWithoutTargetNodeInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutTargetNodeInput | GraphEdgeUpsertWithWhereUniqueWithoutTargetNodeInput[]
    createMany?: GraphEdgeCreateManyTargetNodeInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutTargetNodeInput | GraphEdgeUpdateWithWhereUniqueWithoutTargetNodeInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutTargetNodeInput | GraphEdgeUpdateManyWithWhereWithoutTargetNodeInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type NoteUncheckedUpdateOneWithoutGraphNodeNestedInput = {
    create?: XOR<NoteCreateWithoutGraphNodeInput, NoteUncheckedCreateWithoutGraphNodeInput>
    connectOrCreate?: NoteCreateOrConnectWithoutGraphNodeInput
    upsert?: NoteUpsertWithoutGraphNodeInput
    disconnect?: NoteWhereInput | boolean
    delete?: NoteWhereInput | boolean
    connect?: NoteWhereUniqueInput
    update?: XOR<XOR<NoteUpdateToOneWithWhereWithoutGraphNodeInput, NoteUpdateWithoutGraphNodeInput>, NoteUncheckedUpdateWithoutGraphNodeInput>
  }

  export type FileUncheckedUpdateManyWithoutGraphNodeNestedInput = {
    create?: XOR<FileCreateWithoutGraphNodeInput, FileUncheckedCreateWithoutGraphNodeInput> | FileCreateWithoutGraphNodeInput[] | FileUncheckedCreateWithoutGraphNodeInput[]
    connectOrCreate?: FileCreateOrConnectWithoutGraphNodeInput | FileCreateOrConnectWithoutGraphNodeInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutGraphNodeInput | FileUpsertWithWhereUniqueWithoutGraphNodeInput[]
    createMany?: FileCreateManyGraphNodeInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutGraphNodeInput | FileUpdateWithWhereUniqueWithoutGraphNodeInput[]
    updateMany?: FileUpdateManyWithWhereWithoutGraphNodeInput | FileUpdateManyWithWhereWithoutGraphNodeInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type GraphEdgeUncheckedUpdateManyWithoutSourceNodeNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutSourceNodeInput, GraphEdgeUncheckedCreateWithoutSourceNodeInput> | GraphEdgeCreateWithoutSourceNodeInput[] | GraphEdgeUncheckedCreateWithoutSourceNodeInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutSourceNodeInput | GraphEdgeCreateOrConnectWithoutSourceNodeInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutSourceNodeInput | GraphEdgeUpsertWithWhereUniqueWithoutSourceNodeInput[]
    createMany?: GraphEdgeCreateManySourceNodeInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutSourceNodeInput | GraphEdgeUpdateWithWhereUniqueWithoutSourceNodeInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutSourceNodeInput | GraphEdgeUpdateManyWithWhereWithoutSourceNodeInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type GraphEdgeUncheckedUpdateManyWithoutTargetNodeNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutTargetNodeInput, GraphEdgeUncheckedCreateWithoutTargetNodeInput> | GraphEdgeCreateWithoutTargetNodeInput[] | GraphEdgeUncheckedCreateWithoutTargetNodeInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutTargetNodeInput | GraphEdgeCreateOrConnectWithoutTargetNodeInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutTargetNodeInput | GraphEdgeUpsertWithWhereUniqueWithoutTargetNodeInput[]
    createMany?: GraphEdgeCreateManyTargetNodeInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutTargetNodeInput | GraphEdgeUpdateWithWhereUniqueWithoutTargetNodeInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutTargetNodeInput | GraphEdgeUpdateManyWithWhereWithoutTargetNodeInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGraphEdgesInput = {
    create?: XOR<UserCreateWithoutGraphEdgesInput, UserUncheckedCreateWithoutGraphEdgesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGraphEdgesInput
    connect?: UserWhereUniqueInput
  }

  export type GraphNodeCreateNestedOneWithoutEdgesFromInput = {
    create?: XOR<GraphNodeCreateWithoutEdgesFromInput, GraphNodeUncheckedCreateWithoutEdgesFromInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutEdgesFromInput
    connect?: GraphNodeWhereUniqueInput
  }

  export type GraphNodeCreateNestedOneWithoutEdgesToInput = {
    create?: XOR<GraphNodeCreateWithoutEdgesToInput, GraphNodeUncheckedCreateWithoutEdgesToInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutEdgesToInput
    connect?: GraphNodeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGraphEdgesNestedInput = {
    create?: XOR<UserCreateWithoutGraphEdgesInput, UserUncheckedCreateWithoutGraphEdgesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGraphEdgesInput
    upsert?: UserUpsertWithoutGraphEdgesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGraphEdgesInput, UserUpdateWithoutGraphEdgesInput>, UserUncheckedUpdateWithoutGraphEdgesInput>
  }

  export type GraphNodeUpdateOneRequiredWithoutEdgesFromNestedInput = {
    create?: XOR<GraphNodeCreateWithoutEdgesFromInput, GraphNodeUncheckedCreateWithoutEdgesFromInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutEdgesFromInput
    upsert?: GraphNodeUpsertWithoutEdgesFromInput
    connect?: GraphNodeWhereUniqueInput
    update?: XOR<XOR<GraphNodeUpdateToOneWithWhereWithoutEdgesFromInput, GraphNodeUpdateWithoutEdgesFromInput>, GraphNodeUncheckedUpdateWithoutEdgesFromInput>
  }

  export type GraphNodeUpdateOneRequiredWithoutEdgesToNestedInput = {
    create?: XOR<GraphNodeCreateWithoutEdgesToInput, GraphNodeUncheckedCreateWithoutEdgesToInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutEdgesToInput
    upsert?: GraphNodeUpsertWithoutEdgesToInput
    connect?: GraphNodeWhereUniqueInput
    update?: XOR<XOR<GraphNodeUpdateToOneWithWhereWithoutEdgesToInput, GraphNodeUpdateWithoutEdgesToInput>, GraphNodeUncheckedUpdateWithoutEdgesToInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NoteCreateWithoutUserInput = {
    title?: string | null
    content: string
    positionX?: number | null
    positionY?: number | null
    userSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    graphNode?: GraphNodeCreateNestedOneWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutUserInput = {
    id?: number
    title?: string | null
    content: string
    positionX?: number | null
    positionY?: number | null
    graphNodeId?: number | null
    userSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type NoteCreateOrConnectWithoutUserInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput>
  }

  export type NoteCreateManyUserInputEnvelope = {
    data: NoteCreateManyUserInput | NoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FileCreateWithoutUserInput = {
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
    graphNode?: GraphNodeCreateNestedOneWithoutFilesInput
  }

  export type FileUncheckedCreateWithoutUserInput = {
    id?: number
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
    graphNodeId?: number | null
  }

  export type FileCreateOrConnectWithoutUserInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
  }

  export type FileCreateManyUserInputEnvelope = {
    data: FileCreateManyUserInput | FileCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GraphNodeCreateWithoutUserInput = {
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    note?: NoteCreateNestedOneWithoutGraphNodeInput
    files?: FileCreateNestedManyWithoutGraphNodeInput
    edgesFrom?: GraphEdgeCreateNestedManyWithoutSourceNodeInput
    edgesTo?: GraphEdgeCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeUncheckedCreateWithoutUserInput = {
    id?: number
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    note?: NoteUncheckedCreateNestedOneWithoutGraphNodeInput
    files?: FileUncheckedCreateNestedManyWithoutGraphNodeInput
    edgesFrom?: GraphEdgeUncheckedCreateNestedManyWithoutSourceNodeInput
    edgesTo?: GraphEdgeUncheckedCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeCreateOrConnectWithoutUserInput = {
    where: GraphNodeWhereUniqueInput
    create: XOR<GraphNodeCreateWithoutUserInput, GraphNodeUncheckedCreateWithoutUserInput>
  }

  export type GraphNodeCreateManyUserInputEnvelope = {
    data: GraphNodeCreateManyUserInput | GraphNodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GraphEdgeCreateWithoutUserInput = {
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    sourceNode: GraphNodeCreateNestedOneWithoutEdgesFromInput
    targetNode: GraphNodeCreateNestedOneWithoutEdgesToInput
  }

  export type GraphEdgeUncheckedCreateWithoutUserInput = {
    id?: number
    sourceNodeId: number
    targetNodeId: number
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type GraphEdgeCreateOrConnectWithoutUserInput = {
    where: GraphEdgeWhereUniqueInput
    create: XOR<GraphEdgeCreateWithoutUserInput, GraphEdgeUncheckedCreateWithoutUserInput>
  }

  export type GraphEdgeCreateManyUserInputEnvelope = {
    data: GraphEdgeCreateManyUserInput | GraphEdgeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NoteUpsertWithWhereUniqueWithoutUserInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutUserInput, NoteUncheckedUpdateWithoutUserInput>
    create: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutUserInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutUserInput, NoteUncheckedUpdateWithoutUserInput>
  }

  export type NoteUpdateManyWithWhereWithoutUserInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutUserInput>
  }

  export type NoteScalarWhereInput = {
    AND?: NoteScalarWhereInput | NoteScalarWhereInput[]
    OR?: NoteScalarWhereInput[]
    NOT?: NoteScalarWhereInput | NoteScalarWhereInput[]
    id?: IntFilter<"Note"> | number
    userId?: IntFilter<"Note"> | number
    title?: StringNullableFilter<"Note"> | string | null
    content?: StringFilter<"Note"> | string
    positionX?: FloatNullableFilter<"Note"> | number | null
    positionY?: FloatNullableFilter<"Note"> | number | null
    graphNodeId?: IntNullableFilter<"Note"> | number | null
    userSummary?: StringNullableFilter<"Note"> | string | null
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Note"> | Date | string | null
  }

  export type FileUpsertWithWhereUniqueWithoutUserInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutUserInput, FileUncheckedUpdateWithoutUserInput>
    create: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
  }

  export type FileUpdateWithWhereUniqueWithoutUserInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutUserInput, FileUncheckedUpdateWithoutUserInput>
  }

  export type FileUpdateManyWithWhereWithoutUserInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutUserInput>
  }

  export type FileScalarWhereInput = {
    AND?: FileScalarWhereInput | FileScalarWhereInput[]
    OR?: FileScalarWhereInput[]
    NOT?: FileScalarWhereInput | FileScalarWhereInput[]
    id?: IntFilter<"File"> | number
    userId?: IntFilter<"File"> | number
    filename?: StringFilter<"File"> | string
    storagePath?: StringFilter<"File"> | string
    mimeType?: StringNullableFilter<"File"> | string | null
    size?: BigIntNullableFilter<"File"> | bigint | number | null
    createdAt?: DateTimeFilter<"File"> | Date | string
    graphNodeId?: IntNullableFilter<"File"> | number | null
  }

  export type GraphNodeUpsertWithWhereUniqueWithoutUserInput = {
    where: GraphNodeWhereUniqueInput
    update: XOR<GraphNodeUpdateWithoutUserInput, GraphNodeUncheckedUpdateWithoutUserInput>
    create: XOR<GraphNodeCreateWithoutUserInput, GraphNodeUncheckedCreateWithoutUserInput>
  }

  export type GraphNodeUpdateWithWhereUniqueWithoutUserInput = {
    where: GraphNodeWhereUniqueInput
    data: XOR<GraphNodeUpdateWithoutUserInput, GraphNodeUncheckedUpdateWithoutUserInput>
  }

  export type GraphNodeUpdateManyWithWhereWithoutUserInput = {
    where: GraphNodeScalarWhereInput
    data: XOR<GraphNodeUpdateManyMutationInput, GraphNodeUncheckedUpdateManyWithoutUserInput>
  }

  export type GraphNodeScalarWhereInput = {
    AND?: GraphNodeScalarWhereInput | GraphNodeScalarWhereInput[]
    OR?: GraphNodeScalarWhereInput[]
    NOT?: GraphNodeScalarWhereInput | GraphNodeScalarWhereInput[]
    id?: IntFilter<"GraphNode"> | number
    userId?: IntFilter<"GraphNode"> | number
    label?: StringNullableFilter<"GraphNode"> | string | null
    nodeType?: StringFilter<"GraphNode"> | string
    data?: JsonNullableFilter<"GraphNode">
    position?: JsonNullableFilter<"GraphNode">
    createdAt?: DateTimeFilter<"GraphNode"> | Date | string
    updatedAt?: DateTimeNullableFilter<"GraphNode"> | Date | string | null
  }

  export type GraphEdgeUpsertWithWhereUniqueWithoutUserInput = {
    where: GraphEdgeWhereUniqueInput
    update: XOR<GraphEdgeUpdateWithoutUserInput, GraphEdgeUncheckedUpdateWithoutUserInput>
    create: XOR<GraphEdgeCreateWithoutUserInput, GraphEdgeUncheckedCreateWithoutUserInput>
  }

  export type GraphEdgeUpdateWithWhereUniqueWithoutUserInput = {
    where: GraphEdgeWhereUniqueInput
    data: XOR<GraphEdgeUpdateWithoutUserInput, GraphEdgeUncheckedUpdateWithoutUserInput>
  }

  export type GraphEdgeUpdateManyWithWhereWithoutUserInput = {
    where: GraphEdgeScalarWhereInput
    data: XOR<GraphEdgeUpdateManyMutationInput, GraphEdgeUncheckedUpdateManyWithoutUserInput>
  }

  export type GraphEdgeScalarWhereInput = {
    AND?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
    OR?: GraphEdgeScalarWhereInput[]
    NOT?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
    id?: IntFilter<"GraphEdge"> | number
    userId?: IntFilter<"GraphEdge"> | number
    sourceNodeId?: IntFilter<"GraphEdge"> | number
    targetNodeId?: IntFilter<"GraphEdge"> | number
    relationshipType?: StringNullableFilter<"GraphEdge"> | string | null
    label?: StringNullableFilter<"GraphEdge"> | string | null
    data?: JsonNullableFilter<"GraphEdge">
    createdAt?: DateTimeFilter<"GraphEdge"> | Date | string
    updatedAt?: DateTimeNullableFilter<"GraphEdge"> | Date | string | null
  }

  export type UserCreateWithoutNotesInput = {
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    files?: FileCreateNestedManyWithoutUserInput
    graphNodes?: GraphNodeCreateNestedManyWithoutUserInput
    graphEdges?: GraphEdgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotesInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    graphNodes?: GraphNodeUncheckedCreateNestedManyWithoutUserInput
    graphEdges?: GraphEdgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
  }

  export type GraphNodeCreateWithoutNoteInput = {
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGraphNodesInput
    files?: FileCreateNestedManyWithoutGraphNodeInput
    edgesFrom?: GraphEdgeCreateNestedManyWithoutSourceNodeInput
    edgesTo?: GraphEdgeCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeUncheckedCreateWithoutNoteInput = {
    id?: number
    userId: number
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    files?: FileUncheckedCreateNestedManyWithoutGraphNodeInput
    edgesFrom?: GraphEdgeUncheckedCreateNestedManyWithoutSourceNodeInput
    edgesTo?: GraphEdgeUncheckedCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeCreateOrConnectWithoutNoteInput = {
    where: GraphNodeWhereUniqueInput
    create: XOR<GraphNodeCreateWithoutNoteInput, GraphNodeUncheckedCreateWithoutNoteInput>
  }

  export type UserUpsertWithoutNotesInput = {
    update: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateWithoutNotesInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: FileUpdateManyWithoutUserNestedInput
    graphNodes?: GraphNodeUpdateManyWithoutUserNestedInput
    graphEdges?: GraphEdgeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    graphNodes?: GraphNodeUncheckedUpdateManyWithoutUserNestedInput
    graphEdges?: GraphEdgeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GraphNodeUpsertWithoutNoteInput = {
    update: XOR<GraphNodeUpdateWithoutNoteInput, GraphNodeUncheckedUpdateWithoutNoteInput>
    create: XOR<GraphNodeCreateWithoutNoteInput, GraphNodeUncheckedCreateWithoutNoteInput>
    where?: GraphNodeWhereInput
  }

  export type GraphNodeUpdateToOneWithWhereWithoutNoteInput = {
    where?: GraphNodeWhereInput
    data: XOR<GraphNodeUpdateWithoutNoteInput, GraphNodeUncheckedUpdateWithoutNoteInput>
  }

  export type GraphNodeUpdateWithoutNoteInput = {
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGraphNodesNestedInput
    files?: FileUpdateManyWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUpdateManyWithoutSourceNodeNestedInput
    edgesTo?: GraphEdgeUpdateManyWithoutTargetNodeNestedInput
  }

  export type GraphNodeUncheckedUpdateWithoutNoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    files?: FileUncheckedUpdateManyWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUncheckedUpdateManyWithoutSourceNodeNestedInput
    edgesTo?: GraphEdgeUncheckedUpdateManyWithoutTargetNodeNestedInput
  }

  export type UserCreateWithoutFilesInput = {
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUserInput
    graphNodes?: GraphNodeCreateNestedManyWithoutUserInput
    graphEdges?: GraphEdgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFilesInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
    graphNodes?: GraphNodeUncheckedCreateNestedManyWithoutUserInput
    graphEdges?: GraphEdgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFilesInput, UserUncheckedCreateWithoutFilesInput>
  }

  export type GraphNodeCreateWithoutFilesInput = {
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGraphNodesInput
    note?: NoteCreateNestedOneWithoutGraphNodeInput
    edgesFrom?: GraphEdgeCreateNestedManyWithoutSourceNodeInput
    edgesTo?: GraphEdgeCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeUncheckedCreateWithoutFilesInput = {
    id?: number
    userId: number
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    note?: NoteUncheckedCreateNestedOneWithoutGraphNodeInput
    edgesFrom?: GraphEdgeUncheckedCreateNestedManyWithoutSourceNodeInput
    edgesTo?: GraphEdgeUncheckedCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeCreateOrConnectWithoutFilesInput = {
    where: GraphNodeWhereUniqueInput
    create: XOR<GraphNodeCreateWithoutFilesInput, GraphNodeUncheckedCreateWithoutFilesInput>
  }

  export type UserUpsertWithoutFilesInput = {
    update: XOR<UserUpdateWithoutFilesInput, UserUncheckedUpdateWithoutFilesInput>
    create: XOR<UserCreateWithoutFilesInput, UserUncheckedCreateWithoutFilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFilesInput, UserUncheckedUpdateWithoutFilesInput>
  }

  export type UserUpdateWithoutFilesInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUserNestedInput
    graphNodes?: GraphNodeUpdateManyWithoutUserNestedInput
    graphEdges?: GraphEdgeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
    graphNodes?: GraphNodeUncheckedUpdateManyWithoutUserNestedInput
    graphEdges?: GraphEdgeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GraphNodeUpsertWithoutFilesInput = {
    update: XOR<GraphNodeUpdateWithoutFilesInput, GraphNodeUncheckedUpdateWithoutFilesInput>
    create: XOR<GraphNodeCreateWithoutFilesInput, GraphNodeUncheckedCreateWithoutFilesInput>
    where?: GraphNodeWhereInput
  }

  export type GraphNodeUpdateToOneWithWhereWithoutFilesInput = {
    where?: GraphNodeWhereInput
    data: XOR<GraphNodeUpdateWithoutFilesInput, GraphNodeUncheckedUpdateWithoutFilesInput>
  }

  export type GraphNodeUpdateWithoutFilesInput = {
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGraphNodesNestedInput
    note?: NoteUpdateOneWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUpdateManyWithoutSourceNodeNestedInput
    edgesTo?: GraphEdgeUpdateManyWithoutTargetNodeNestedInput
  }

  export type GraphNodeUncheckedUpdateWithoutFilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NoteUncheckedUpdateOneWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUncheckedUpdateManyWithoutSourceNodeNestedInput
    edgesTo?: GraphEdgeUncheckedUpdateManyWithoutTargetNodeNestedInput
  }

  export type UserCreateWithoutGraphNodesInput = {
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    graphEdges?: GraphEdgeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGraphNodesInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    graphEdges?: GraphEdgeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGraphNodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGraphNodesInput, UserUncheckedCreateWithoutGraphNodesInput>
  }

  export type NoteCreateWithoutGraphNodeInput = {
    title?: string | null
    content: string
    positionX?: number | null
    positionY?: number | null
    userSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateWithoutGraphNodeInput = {
    id?: number
    userId: number
    title?: string | null
    content: string
    positionX?: number | null
    positionY?: number | null
    userSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type NoteCreateOrConnectWithoutGraphNodeInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutGraphNodeInput, NoteUncheckedCreateWithoutGraphNodeInput>
  }

  export type FileCreateWithoutGraphNodeInput = {
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFilesInput
  }

  export type FileUncheckedCreateWithoutGraphNodeInput = {
    id?: number
    userId: number
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
  }

  export type FileCreateOrConnectWithoutGraphNodeInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutGraphNodeInput, FileUncheckedCreateWithoutGraphNodeInput>
  }

  export type FileCreateManyGraphNodeInputEnvelope = {
    data: FileCreateManyGraphNodeInput | FileCreateManyGraphNodeInput[]
    skipDuplicates?: boolean
  }

  export type GraphEdgeCreateWithoutSourceNodeInput = {
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGraphEdgesInput
    targetNode: GraphNodeCreateNestedOneWithoutEdgesToInput
  }

  export type GraphEdgeUncheckedCreateWithoutSourceNodeInput = {
    id?: number
    userId: number
    targetNodeId: number
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type GraphEdgeCreateOrConnectWithoutSourceNodeInput = {
    where: GraphEdgeWhereUniqueInput
    create: XOR<GraphEdgeCreateWithoutSourceNodeInput, GraphEdgeUncheckedCreateWithoutSourceNodeInput>
  }

  export type GraphEdgeCreateManySourceNodeInputEnvelope = {
    data: GraphEdgeCreateManySourceNodeInput | GraphEdgeCreateManySourceNodeInput[]
    skipDuplicates?: boolean
  }

  export type GraphEdgeCreateWithoutTargetNodeInput = {
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGraphEdgesInput
    sourceNode: GraphNodeCreateNestedOneWithoutEdgesFromInput
  }

  export type GraphEdgeUncheckedCreateWithoutTargetNodeInput = {
    id?: number
    userId: number
    sourceNodeId: number
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type GraphEdgeCreateOrConnectWithoutTargetNodeInput = {
    where: GraphEdgeWhereUniqueInput
    create: XOR<GraphEdgeCreateWithoutTargetNodeInput, GraphEdgeUncheckedCreateWithoutTargetNodeInput>
  }

  export type GraphEdgeCreateManyTargetNodeInputEnvelope = {
    data: GraphEdgeCreateManyTargetNodeInput | GraphEdgeCreateManyTargetNodeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutGraphNodesInput = {
    update: XOR<UserUpdateWithoutGraphNodesInput, UserUncheckedUpdateWithoutGraphNodesInput>
    create: XOR<UserCreateWithoutGraphNodesInput, UserUncheckedCreateWithoutGraphNodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGraphNodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGraphNodesInput, UserUncheckedUpdateWithoutGraphNodesInput>
  }

  export type UserUpdateWithoutGraphNodesInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    graphEdges?: GraphEdgeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGraphNodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    graphEdges?: GraphEdgeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type NoteUpsertWithoutGraphNodeInput = {
    update: XOR<NoteUpdateWithoutGraphNodeInput, NoteUncheckedUpdateWithoutGraphNodeInput>
    create: XOR<NoteCreateWithoutGraphNodeInput, NoteUncheckedCreateWithoutGraphNodeInput>
    where?: NoteWhereInput
  }

  export type NoteUpdateToOneWithWhereWithoutGraphNodeInput = {
    where?: NoteWhereInput
    data: XOR<NoteUpdateWithoutGraphNodeInput, NoteUncheckedUpdateWithoutGraphNodeInput>
  }

  export type NoteUpdateWithoutGraphNodeInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateWithoutGraphNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUpsertWithWhereUniqueWithoutGraphNodeInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutGraphNodeInput, FileUncheckedUpdateWithoutGraphNodeInput>
    create: XOR<FileCreateWithoutGraphNodeInput, FileUncheckedCreateWithoutGraphNodeInput>
  }

  export type FileUpdateWithWhereUniqueWithoutGraphNodeInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutGraphNodeInput, FileUncheckedUpdateWithoutGraphNodeInput>
  }

  export type FileUpdateManyWithWhereWithoutGraphNodeInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutGraphNodeInput>
  }

  export type GraphEdgeUpsertWithWhereUniqueWithoutSourceNodeInput = {
    where: GraphEdgeWhereUniqueInput
    update: XOR<GraphEdgeUpdateWithoutSourceNodeInput, GraphEdgeUncheckedUpdateWithoutSourceNodeInput>
    create: XOR<GraphEdgeCreateWithoutSourceNodeInput, GraphEdgeUncheckedCreateWithoutSourceNodeInput>
  }

  export type GraphEdgeUpdateWithWhereUniqueWithoutSourceNodeInput = {
    where: GraphEdgeWhereUniqueInput
    data: XOR<GraphEdgeUpdateWithoutSourceNodeInput, GraphEdgeUncheckedUpdateWithoutSourceNodeInput>
  }

  export type GraphEdgeUpdateManyWithWhereWithoutSourceNodeInput = {
    where: GraphEdgeScalarWhereInput
    data: XOR<GraphEdgeUpdateManyMutationInput, GraphEdgeUncheckedUpdateManyWithoutSourceNodeInput>
  }

  export type GraphEdgeUpsertWithWhereUniqueWithoutTargetNodeInput = {
    where: GraphEdgeWhereUniqueInput
    update: XOR<GraphEdgeUpdateWithoutTargetNodeInput, GraphEdgeUncheckedUpdateWithoutTargetNodeInput>
    create: XOR<GraphEdgeCreateWithoutTargetNodeInput, GraphEdgeUncheckedCreateWithoutTargetNodeInput>
  }

  export type GraphEdgeUpdateWithWhereUniqueWithoutTargetNodeInput = {
    where: GraphEdgeWhereUniqueInput
    data: XOR<GraphEdgeUpdateWithoutTargetNodeInput, GraphEdgeUncheckedUpdateWithoutTargetNodeInput>
  }

  export type GraphEdgeUpdateManyWithWhereWithoutTargetNodeInput = {
    where: GraphEdgeScalarWhereInput
    data: XOR<GraphEdgeUpdateManyMutationInput, GraphEdgeUncheckedUpdateManyWithoutTargetNodeInput>
  }

  export type UserCreateWithoutGraphEdgesInput = {
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    graphNodes?: GraphNodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGraphEdgesInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    createdAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    graphNodes?: GraphNodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGraphEdgesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGraphEdgesInput, UserUncheckedCreateWithoutGraphEdgesInput>
  }

  export type GraphNodeCreateWithoutEdgesFromInput = {
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGraphNodesInput
    note?: NoteCreateNestedOneWithoutGraphNodeInput
    files?: FileCreateNestedManyWithoutGraphNodeInput
    edgesTo?: GraphEdgeCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeUncheckedCreateWithoutEdgesFromInput = {
    id?: number
    userId: number
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    note?: NoteUncheckedCreateNestedOneWithoutGraphNodeInput
    files?: FileUncheckedCreateNestedManyWithoutGraphNodeInput
    edgesTo?: GraphEdgeUncheckedCreateNestedManyWithoutTargetNodeInput
  }

  export type GraphNodeCreateOrConnectWithoutEdgesFromInput = {
    where: GraphNodeWhereUniqueInput
    create: XOR<GraphNodeCreateWithoutEdgesFromInput, GraphNodeUncheckedCreateWithoutEdgesFromInput>
  }

  export type GraphNodeCreateWithoutEdgesToInput = {
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGraphNodesInput
    note?: NoteCreateNestedOneWithoutGraphNodeInput
    files?: FileCreateNestedManyWithoutGraphNodeInput
    edgesFrom?: GraphEdgeCreateNestedManyWithoutSourceNodeInput
  }

  export type GraphNodeUncheckedCreateWithoutEdgesToInput = {
    id?: number
    userId: number
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    note?: NoteUncheckedCreateNestedOneWithoutGraphNodeInput
    files?: FileUncheckedCreateNestedManyWithoutGraphNodeInput
    edgesFrom?: GraphEdgeUncheckedCreateNestedManyWithoutSourceNodeInput
  }

  export type GraphNodeCreateOrConnectWithoutEdgesToInput = {
    where: GraphNodeWhereUniqueInput
    create: XOR<GraphNodeCreateWithoutEdgesToInput, GraphNodeUncheckedCreateWithoutEdgesToInput>
  }

  export type UserUpsertWithoutGraphEdgesInput = {
    update: XOR<UserUpdateWithoutGraphEdgesInput, UserUncheckedUpdateWithoutGraphEdgesInput>
    create: XOR<UserCreateWithoutGraphEdgesInput, UserUncheckedCreateWithoutGraphEdgesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGraphEdgesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGraphEdgesInput, UserUncheckedUpdateWithoutGraphEdgesInput>
  }

  export type UserUpdateWithoutGraphEdgesInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    graphNodes?: GraphNodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGraphEdgesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    graphNodes?: GraphNodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GraphNodeUpsertWithoutEdgesFromInput = {
    update: XOR<GraphNodeUpdateWithoutEdgesFromInput, GraphNodeUncheckedUpdateWithoutEdgesFromInput>
    create: XOR<GraphNodeCreateWithoutEdgesFromInput, GraphNodeUncheckedCreateWithoutEdgesFromInput>
    where?: GraphNodeWhereInput
  }

  export type GraphNodeUpdateToOneWithWhereWithoutEdgesFromInput = {
    where?: GraphNodeWhereInput
    data: XOR<GraphNodeUpdateWithoutEdgesFromInput, GraphNodeUncheckedUpdateWithoutEdgesFromInput>
  }

  export type GraphNodeUpdateWithoutEdgesFromInput = {
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGraphNodesNestedInput
    note?: NoteUpdateOneWithoutGraphNodeNestedInput
    files?: FileUpdateManyWithoutGraphNodeNestedInput
    edgesTo?: GraphEdgeUpdateManyWithoutTargetNodeNestedInput
  }

  export type GraphNodeUncheckedUpdateWithoutEdgesFromInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NoteUncheckedUpdateOneWithoutGraphNodeNestedInput
    files?: FileUncheckedUpdateManyWithoutGraphNodeNestedInput
    edgesTo?: GraphEdgeUncheckedUpdateManyWithoutTargetNodeNestedInput
  }

  export type GraphNodeUpsertWithoutEdgesToInput = {
    update: XOR<GraphNodeUpdateWithoutEdgesToInput, GraphNodeUncheckedUpdateWithoutEdgesToInput>
    create: XOR<GraphNodeCreateWithoutEdgesToInput, GraphNodeUncheckedCreateWithoutEdgesToInput>
    where?: GraphNodeWhereInput
  }

  export type GraphNodeUpdateToOneWithWhereWithoutEdgesToInput = {
    where?: GraphNodeWhereInput
    data: XOR<GraphNodeUpdateWithoutEdgesToInput, GraphNodeUncheckedUpdateWithoutEdgesToInput>
  }

  export type GraphNodeUpdateWithoutEdgesToInput = {
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGraphNodesNestedInput
    note?: NoteUpdateOneWithoutGraphNodeNestedInput
    files?: FileUpdateManyWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUpdateManyWithoutSourceNodeNestedInput
  }

  export type GraphNodeUncheckedUpdateWithoutEdgesToInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NoteUncheckedUpdateOneWithoutGraphNodeNestedInput
    files?: FileUncheckedUpdateManyWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUncheckedUpdateManyWithoutSourceNodeNestedInput
  }

  export type NoteCreateManyUserInput = {
    id?: number
    title?: string | null
    content: string
    positionX?: number | null
    positionY?: number | null
    graphNodeId?: number | null
    userSummary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type FileCreateManyUserInput = {
    id?: number
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
    graphNodeId?: number | null
  }

  export type GraphNodeCreateManyUserInput = {
    id?: number
    label?: string | null
    nodeType: string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type GraphEdgeCreateManyUserInput = {
    id?: number
    sourceNodeId: number
    targetNodeId: number
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type NoteUpdateWithoutUserInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    graphNode?: GraphNodeUpdateOneWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    graphNodeId?: NullableIntFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NoteUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    positionX?: NullableFloatFieldUpdateOperationsInput | number | null
    positionY?: NullableFloatFieldUpdateOperationsInput | number | null
    graphNodeId?: NullableIntFieldUpdateOperationsInput | number | null
    userSummary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUpdateWithoutUserInput = {
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    graphNode?: GraphNodeUpdateOneWithoutFilesNestedInput
  }

  export type FileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    graphNodeId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FileUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    graphNodeId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GraphNodeUpdateWithoutUserInput = {
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NoteUpdateOneWithoutGraphNodeNestedInput
    files?: FileUpdateManyWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUpdateManyWithoutSourceNodeNestedInput
    edgesTo?: GraphEdgeUpdateManyWithoutTargetNodeNestedInput
  }

  export type GraphNodeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NoteUncheckedUpdateOneWithoutGraphNodeNestedInput
    files?: FileUncheckedUpdateManyWithoutGraphNodeNestedInput
    edgesFrom?: GraphEdgeUncheckedUpdateManyWithoutSourceNodeNestedInput
    edgesTo?: GraphEdgeUncheckedUpdateManyWithoutTargetNodeNestedInput
  }

  export type GraphNodeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    nodeType?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    position?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphEdgeUpdateWithoutUserInput = {
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceNode?: GraphNodeUpdateOneRequiredWithoutEdgesFromNestedInput
    targetNode?: GraphNodeUpdateOneRequiredWithoutEdgesToNestedInput
  }

  export type GraphEdgeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceNodeId?: IntFieldUpdateOperationsInput | number
    targetNodeId?: IntFieldUpdateOperationsInput | number
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphEdgeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceNodeId?: IntFieldUpdateOperationsInput | number
    targetNodeId?: IntFieldUpdateOperationsInput | number
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileCreateManyGraphNodeInput = {
    id?: number
    userId: number
    filename: string
    storagePath: string
    mimeType?: string | null
    size?: bigint | number | null
    createdAt?: Date | string
  }

  export type GraphEdgeCreateManySourceNodeInput = {
    id?: number
    userId: number
    targetNodeId: number
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type GraphEdgeCreateManyTargetNodeInput = {
    id?: number
    userId: number
    sourceNodeId: number
    relationshipType?: string | null
    label?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type FileUpdateWithoutGraphNodeInput = {
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFilesNestedInput
  }

  export type FileUncheckedUpdateWithoutGraphNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUncheckedUpdateManyWithoutGraphNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphEdgeUpdateWithoutSourceNodeInput = {
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGraphEdgesNestedInput
    targetNode?: GraphNodeUpdateOneRequiredWithoutEdgesToNestedInput
  }

  export type GraphEdgeUncheckedUpdateWithoutSourceNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    targetNodeId?: IntFieldUpdateOperationsInput | number
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphEdgeUncheckedUpdateManyWithoutSourceNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    targetNodeId?: IntFieldUpdateOperationsInput | number
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphEdgeUpdateWithoutTargetNodeInput = {
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGraphEdgesNestedInput
    sourceNode?: GraphNodeUpdateOneRequiredWithoutEdgesFromNestedInput
  }

  export type GraphEdgeUncheckedUpdateWithoutTargetNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceNodeId?: IntFieldUpdateOperationsInput | number
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GraphEdgeUncheckedUpdateManyWithoutTargetNodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceNodeId?: IntFieldUpdateOperationsInput | number
    relationshipType?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}