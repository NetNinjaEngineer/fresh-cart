import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', loadComponent: () => import("./layouts/blank-layout/blank-layout.component").then(m => m.BlankLayoutComponent), children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import("./components/home/home.component").then(m => m.HomeComponent), title: 'Home' },
            { path: 'products', loadComponent: () => import("./components/products/products.component").then(m => m.ProductsComponent), title: 'Products' },
            { path: 'categories', loadComponent: () => import("./components/categories/categories.component").then(m => m.CategoriesComponent), title: 'Categories' },
            { path: 'brands', loadComponent: () => import("./components/brands/brands.component").then(m => m.BrandsComponent), title: 'Brands' },
            { path: 'cart', loadComponent: () => import("./components/cart/cart.component").then(m => m.CartComponent), title: 'Cart' },
        ]
    },
    {
        path: '', loadComponent: () => import("./layouts/auth-layout/auth-layout.component").then(m => m.AuthLayoutComponent), children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import("./components/login/login.component").then(m => m.LoginComponent), title: 'Login' },
            { path: 'register', loadComponent: () => import("./components/register/register.component").then(m => m.RegisterComponent), title: 'Register' }
        ]
    },
    { path: '**', loadComponent: () => import("./components/not-found/not-found.component").then(m => m.NotFoundComponent), title: 'Not-Found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
