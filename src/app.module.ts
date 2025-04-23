<<<<<<< HEAD
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Product } from './products/product.entity'; // Importa la entidad Product
import { User } from './users/users.entity'; // Importa la entidad User

@Module({
  imports: [ProductsModule, TagsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'Proyecto4B_MS',
    entities: [User, Product], // Asegúrate de incluir tus entidades aquí
    retryDelay: 3000,
    autoLoadEntities: true,
    synchronize: true,
    logging: true
}), UsersModule],
  controllers: [AppController], // Elimina los controladores específicos aquí, ya están en sus módulos
  providers: [AppService],
})
export class AppModule {}
=======
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './customers/customers.controller';
import { ProductsService } from './products/products.service';
import { CustomersService } from './customers/customers.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, UsersController, CustomersController],
  providers: [AppService, ProductsService, CustomersService],
})
export class AppModule {}
>>>>>>> cf42c8a8409f356e528396b2c18f1407ee49c3f6
