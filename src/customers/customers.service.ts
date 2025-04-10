import { Injectable } from '@nestjs/common';
import { Customers } from './customers.interface';

@Injectable()
export class CustomersService {
    
    private customers : Customers[] = [ 
        {
            
        id: 0,
        name: 'Danny Chavez',
        age: 40,
        birthday: new Date( '1984-07-28')
    },
    {
        id: 1,
        name: 'Miguel Sosa',
        age: 41,
        birthday: new Date( '1984-02-08')
    },
    {
        id: 2,
        name: 'Paula Sosa',
        age: 21,
        birthday:new Date( '2004-04-20')
    },
    {
        id: 3,
        name: 'Nicolas Sosa',
        age: 14,
        birthday: new Date( '2010-08-10')
      },
      {
        id: 4,
        name: 'Domenica Sosa',
        age: 7,
        birthday: new Date( '2018-03-27')
      },

    ]

    // READ DEL CRUD
    getCustomers(): Customers[] {
        return this.customers;
      }
    
      getId(id: number) {
        return this.customers.find( (item: Customers) => item.id == id);
      }
    
      // CREATE DEL CRUD
      
      insert(body: any) {
        this.customers = [
          ...this.customers,
          {
            id: this.lastID() + 1,
            name: body.name,
            age: body.age,
            birthday: body.birthday
          }
        ];
      }
      private lastID(): number {
        return this.customers [this.customers.length -1].id
      }
    
    // READ DEL CRUD

      update(id: number, body: any) {
        let product: Customers = {
          id,
          name: body.name,
          age: body.age,
          birthday: body.birthday
        }
        this.customers = this.customers.map( (item: Customers) => {
          console.log(item, id, item.id == id);
          return item.id == id ? product : item;
        });
      }

    
    }