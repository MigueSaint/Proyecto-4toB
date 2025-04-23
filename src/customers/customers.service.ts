import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import {Customer} from './interface/customers/customer.interface'
import { CustomerPatchDto } from './dto/customers.dto/customer-patch.dto';

@Injectable()
export class CustomersService {
    private customers : Customer[] = [
        {
            id: 0,
            name: 'Diego Yanez',
            age: 31,
            birthday: new Date('1999-02-06'),
        },
        {
            id: 1,
            name: 'Miguel Sosa',
            age: 27,
            birthday: new Date('1998-02-06'),
        },
        {
            id: 2,
            name: 'Cristian Redin',
            age: 26,
            birthday: new Date('1997-02-06'),
        },
    ]

    //READ DEL CRUD
    getCustomers(): Customer[] {
        return this.customers;
    }

    getCustomersById(id: number): Customer | undefined{
        return this.customers.find((item: Customer) => item.id == id);
    }

    //CREATE DEL CRUD

    insert(body: any) {
        this.customers = [
            ...this.customers,
            {
                id: this.lastId() + 1,
                name: body.name,
                age: body.age,
                birthday: body.birthday,
            }
        ];
    }

    private lastId(): number {
        return this.customers[this.customers.length - 1]?.id ?? 0;
    }
    

    //UPDATE DEL CRUD

    update(id: number, body: any) {
        let customer: Customer = {
            id,
            name: body.name,
            age: body.age,
            birthday: body.birthday,
        }
        this.customers = this.customers.map( (item: Customer) => {
            console.log(item, id, item.id == id);
            return item.id == id? customer : item;
        }
        )
    }

    //DELETE DENTRO DEL CRUD

    delete(id: number) {
        this.customers = this.customers.filter( (item: Customer) => item.id != id);
    }



    //PATCH DEL CRUD

    patch(id: number, body: CustomerPatchDto) {
        let previousCustomer = this.getCustomersById(id);
        if (!previousCustomer) throw new Error('Customer not found');
        let customer: Customer = {
          ...previousCustomer,
          ...body
        }
        this.customers = this.customers.map((item: Customer) => {
          return item.id == id ? customer : item;
        });
      
}
}
=======
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

    //ACTUALIZACION PARCIAL DEL CRUD

    partialUpdate(id: number, body: Partial<Customers>) {
      const customer = this.customers.find((item: Customers) => item.id === id);
    
      if (!customer) {
        return { message: `Cliente con ID ${id} no fue encontrado` };
      }
    
      // Actualiza solo los campos presentes en el body
      Object.assign(customer, body);
    
      return { message: `Cliente con ID ${id} fue actualizado correctamente` };
    }

    }
>>>>>>> cf42c8a8409f356e528396b2c18f1407ee49c3f6
