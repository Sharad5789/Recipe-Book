import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AuthComponent } from "./auth/auth.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe/recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipesResolverService } from "./recipe/recipes-resolver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const appRoutes: Routes = [
    {path: '' , redirectTo: 'auth' , pathMatch: 'full'},
    {path: 'recipe', component: RecipeComponent, canActivate: [AuthGuard] , children:[
      {path: '', component: RecipeStartComponent , resolve: [RecipesResolverService]}, 
      {path: 'new' , component: RecipeEditComponent},
      {path: ':id' , component: RecipeDetailComponent , resolve: [RecipesResolverService]},
      {path: ':id/edit' , component: RecipeEditComponent , resolve: [RecipesResolverService]}
    ]},
    {path: 'shopping-list' , component: ShoppingListComponent},
    {path: 'shopping-list/:name' ,  component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent},

    {path: 'not-found', component:PageNotFoundComponent},
    {path: '**', redirectTo: "/not-found"}
  ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}