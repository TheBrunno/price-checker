use price_checker;

insert into seller(seller, product_tag_price, product_class_price, captcha_page_identifier)
values ('Magazine Luiza', 'p', 'sc-dcJsrY eLxcFM sc-hgRRfv dfAhbD', 'Incidente ID');

insert into laptop(model, processor, ram, expected_price)
values (
    'Notebook ASUS Vivobook Go 15',
    'Ryzen 5 7520U',
    16,
    2500
);
desc laptop_seller;

insert into laptop_seller(fk_laptop, fk_seller, link)
values (1, 1, 'https://www.magazineluiza.com.br/notebook-asus-vivobook-go-15-e1504fa-amd-ryzen-5-7520u-16gb-ram-512gb-ssd-linux-keepos-tela-156-fhd-black-nj1288/p/aebhcg3bch/in/note/');


select * from checks;