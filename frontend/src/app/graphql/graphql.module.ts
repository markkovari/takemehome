import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';

const uri = 'http://localhost:3014/graphql';

const headers = new HttpHeaders({
  'Access-Control-Allow-Origin': 'http://localhost:4200',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'application/json',
});

@NgModule({
  exports: [HttpClientModule],
  declarations: [],
  imports: [CommonModule],
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri, headers }),
      cache: new InMemoryCache(),
      resolvers: {},
    });
  }
}
