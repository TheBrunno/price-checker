use price_checker;

insert into seller(seller, product_tag_price, product_class_price)
values ('Magazine Luiza', 'p', 'sc-dcJsrY eLxcFM sc-hgRRfv dfAhbD');

insert into laptop(link, model, processor, ram)
values (
	'https://www.magazineluiza.com.br/notebook-asus-vivobook-go-15-e1504fa-amd-ryzen-5-7520u-16gb-ram-512gb-ssd-linux-keepos-tela-156-fhd-black-nj1288/p/aebhcg3bch/in/note/',
    'Notebook ASUS Vivobook Go 15',
    'Ryzen 5 7520U',
    16	
);

insert into laptop_seller(fkLaptop, fkSeller)
values (1, 1);