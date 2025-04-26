import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Product } from './products/product.entity'; 
import { Users } from './users/users.entity'; 
import { SizeModule } from './size/size.module';
import { SizeService } from './size/size.service';
import { ProductSizeModule } from './product-size/product-size.module';

@Module({
  imports: [ProductsModule, TagsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'Proyecto4B_MS',
    entities: [Users, Product], 
    retryDelay: 3000,
    autoLoadEntities: true,
    synchronize: true,
    logging: true
}), UsersModule, SizeModule, ProductSizeModule],
  controllers: [AppController], // Elimina los controladores específicos aquí, ya están en sus módulos
  providers: [AppService, SizeService],
})
export class AppModule {}
