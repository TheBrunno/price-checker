create database price_checker;

use price_checker;
create table seller(
	id int primary key auto_increment,
    seller varchar(100) not null,
    product_tag_price varchar(10) not null,
    product_class_price text not null
);

create table laptop(
	id int primary key auto_increment,
    link text not null,
    model text not null,
    processor varchar(20) not null,
    ram int not null
);

create table laptop_seller(
	id int primary key auto_increment,
    fk_laptop int,
    fk_seller int,
    
    foreign key(fkLaptop) references laptop(id),
    foreign key(fkSeller) references seller(id)
);

create table checks(
	id int primary key auto_increment,
    price varchar(15) not null,
    fkLaptop int,
    checkAt datetime default current_timestamp,
    
    foreign key (fkLaptop) references laptop(id)
);

