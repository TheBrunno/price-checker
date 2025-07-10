use price_checker;

insert into seller(seller, product_tag_price, product_class_price)
values ('Magazine Luiza', 'p', 'sc-dcJsrY eLxcFM sc-hgRRfv dfAhbD');

insert into laptop(model, processor, ram)
values (
    'Notebook ASUS Vivobook Go 15',
    'Ryzen 5 7520U',
    16	
);
desc laptop_seller;

insert into laptop_seller(fk_laptop, fk_seller, link)
values (1, 1, 'https://www.magazineluiza.com.br/notebook-asus-vivobook-go-15-e1504fa-amd-ryzen-5-7520u-16gb-ram-512gb-ssd-linux-keepos-tela-156-fhd-black-nj1288/p/aebhcg3bch/in/note/');

select sel.id sellerId, lap.id laptopId, seller, product_tag_price, product_class_price, link from seller sel
inner join laptop_seller ls on sel.id = ls.fk_seller
inner join laptop lap on ls.fk_laptop = lap.id;

select * from checks;