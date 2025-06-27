--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(45) NOT NULL,
    handle character varying(45) NOT NULL,
    image character varying(255) NOT NULL,
    status boolean NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: dishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dishlist (
    id integer NOT NULL,
    category_id integer NOT NULL,
    name character varying(45) NOT NULL,
    title character varying(45) NOT NULL,
    currency character varying(45) NOT NULL,
    price numeric(10,3) NOT NULL,
    description character varying(255) DEFAULT NULL::character varying,
    status boolean NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.dishlist OWNER TO postgres;

--
-- Name: dishlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dishlist_id_seq OWNER TO postgres;

--
-- Name: dishlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dishlist_id_seq OWNED BY public.dishlist.id;


--
-- Name: dishlist_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dishlist_images (
    id integer NOT NULL,
    id_dishlist integer NOT NULL,
    alt_text character varying(45) DEFAULT NULL::character varying,
    image character varying(255) NOT NULL,
    create_at timestamp with time zone DEFAULT now() NOT NULL,
    update_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.dishlist_images OWNER TO postgres;

--
-- Name: dishlist_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dishlist_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dishlist_images_id_seq OWNER TO postgres;

--
-- Name: dishlist_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dishlist_images_id_seq OWNED BY public.dishlist_images.id;


--
-- Name: order_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_details (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,3) NOT NULL,
    note character varying(255) DEFAULT NULL::character varying,
    id_dishlist integer NOT NULL,
    id_order integer NOT NULL,
    create_at timestamp with time zone DEFAULT now() NOT NULL,
    update_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.order_details OWNER TO postgres;

--
-- Name: order_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_details_id_seq OWNER TO postgres;

--
-- Name: order_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;


--
-- Name: order_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_table (
    id integer NOT NULL,
    user_id integer NOT NULL,
    address character varying(255) NOT NULL,
    customer_note character varying(45) DEFAULT NULL::character varying,
    customer_name character varying(45) NOT NULL,
    customer_phone character varying(45) NOT NULL,
    total_price numeric(10,3) NOT NULL,
    status boolean DEFAULT true NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    process character varying(50) DEFAULT NULL::character varying,
    create_at timestamp with time zone DEFAULT now() NOT NULL,
    update_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.order_table OWNER TO postgres;

--
-- Name: order_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_table_id_seq OWNER TO postgres;

--
-- Name: order_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_table_id_seq OWNED BY public.order_table.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    fullname character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    phone_number character varying(45) NOT NULL,
    address character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    create_at timestamp with time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    rule character varying(50),
    CONSTRAINT user_rule_check CHECK (((rule)::text = ANY (ARRAY[('admin'::character varying)::text, ('customer'::character varying)::text])))
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: dishlist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishlist ALTER COLUMN id SET DEFAULT nextval('public.dishlist_id_seq'::regclass);


--
-- Name: dishlist_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishlist_images ALTER COLUMN id SET DEFAULT nextval('public.dishlist_images_id_seq'::regclass);


--
-- Name: order_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);


--
-- Name: order_table id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table ALTER COLUMN id SET DEFAULT nextval('public.order_table_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, handle, image, status) FROM stdin;
1	Hot Deals	hotdeals	https://static.kfcvietnam.com.vn/images/category/lg/KHUYEN%20MAI.jpg?v=LKwQDL	t
2	New products	newproducts	https://static.kfcvietnam.com.vn/images/category/lg/MON%20MOI.jpg?v=LKwQDL	t
4	Combo for sharing	comboforsharing	https://static.kfcvietnam.com.vn/images/category/lg/COMBO%20NHOM.jpg?v=LKwQDL	t
7	Snack	snack	https://static.kfcvietnam.com.vn/images/category/lg/MON%20AN%20NHE.jpg?v=LKwQDL	t
8	Dessert & Drinks	dessert&drinks	https://static.kfcvietnam.com.vn/images/category/lg/TRANG%20MIENG.jpg?v=LKwQDL	t
5	Fried & Roasted	fried&roasted	https://static.kfcvietnam.com.vn/images/category/lg/GA.jpg?v=LKwQDL	t
6	Rice - Burger - Pasta	riceburgerpasta	https://static.kfcvietnam.com.vn/images/category/lg/COM.jpg?v=LKwQDL	t
3	Combo for one	combofor1	https://static.kfcvietnam.com.vn/images/category/lg/COMBO%201%20NGUOI.jpg?v=LKwQDL	t
\.


--
-- Data for Name: dishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dishlist (id, category_id, name, title, currency, price, description, status, create_at, update_at) FROM stdin;
4	3	Combo one Fried Chicken	Combo for one - Combo 1 Fried Chicken	VND	59.000	1 Fried Chicken + 1 French Fries (R) /MPCL (R)+ 1 Pepsi (STD) + 2 Sachet (Tomato/ Chili sauce)	t	2025-06-03 14:42:24	2025-06-25 01:33:22.096
2	8	Choco Milk Hot	Dessert & Drinks - Choco Milk Hot	VND	20.000	1 Choco Milk Hot	t	2025-06-03 14:28:41	2025-06-24 04:52:01.867
1	6	Fried Chicken Pasta	Rice  - Fried Chicken Pasta	VND	42.000	1 Pasta with with Fried Chicken + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-09 13:18:54.646	2025-06-11 13:29:16.172
38	5	Popcorn (R)	Fried & Roasted - Popcorn (R)	VND	38.000	Popcorn (R) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:42:13	2025-06-11 13:30:19.96
8	8	2 Golden Lava Taro1	Dessert & Drinks - 2 Golden Lava Taro	VND	26.000	2 Golden Lava Taro	t	2025-06-03 14:51:18	2025-06-23 17:37:06.592
11	2	COMBO YOLO	New products - COMBO YOLO	VND	59.000	1 Burger Ga Yo + 1 French Fries(R) + 1 Pepsi (M)	t	2025-06-03 14:54:12	2025-06-11 09:46:29.908
6	6	Burger Zinger	Burger - Burger Zinger	VND	54.000	1 Burger Zinger + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-03 14:48:34	2025-06-11 09:49:19.463
7	7	Salad Hat	Snack - Salad Hat	VND	39.000	1 Salad Hat	t	2025-06-03 14:49:51	2025-06-11 09:50:11.169
5	4	Combo Perfect Two (2 pax)	Combo for sharing - Combo Perfect Two (2 pax)	VND	135.000	2 Fried Chicken + 1 Zinger Chicken Burger + 2 Pepsi (STD) + 3 Sachet (Tomato/ Chili sauce)	t	2025-06-03 14:47:23	2025-06-11 09:51:20.481
12	2	COMBO YO GION	New products - COMBO YO GI??N	VND	72.000	1 Burger Ga Yo + 1 Fried Chicken + 1 Pepsi (M)	t	2025-06-03 14:55:06	2025-06-11 11:31:24.339
13	2	COMBO YO NO	M??n m???i - COMBO YO NO	VND	133.000	1 Burger Ga Yo + 2 Fried Chicken + 1 French Fries(R) + 2 Pepsi (M)	t	2025-06-03 14:55:56	2025-06-11 11:32:26.607
10	1	Combo Qu???y ?????nh	??u ????i - Combo Quay Dinh	VND	302.000	4 Fried Chicken + 1 Pasta Pop + 1 Shrimp Burger + 3 Tenders + 3 Pepsi (STD)	t	2025-06-03 14:53:28	2025-06-11 13:09:14.704
14	2	Fresh Yuzu Sauce	New products - Fresh Yuzu Sauce	VND	5.000	Fresh Yuzu Sauce	t	2025-06-03 14:56:39	2025-06-11 13:10:32.925
15	2	Combo 2 Fried Chicken	New products -Combo 2 Fried Chicken	VND	95.000	2 Fried Chicken + 1 French Fries (R) /MPCL (R) + 1 Pepsi (STD) + 3 Sachet (Tomato/ Chili sauce)	t	2025-06-03 15:01:08	2025-06-11 13:11:41.357
16	3	Combo Tenders	Combo for 1 - Combo Tenders	VND	95.000	3 Tenders Chicken / Roasted Fillet Chicken + 1 Grain Salad + 1 Pepsi No sugar (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-03 15:02:12	2025-06-11 13:12:21.287
17	3	Combo Roasted Fillet Chicken	Combo for 1 - Combo Roasted Fillet Chicken	VND	85.000	1 Roasted Fillet Chicken /or 1 Roasted Fillet Chicken Black Pepper + 1 Coleslaw (L) + 1 Pepsi No Sugar (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-03 15:03:00	2025-06-11 13:12:44.837
18	3	Combo Popcorn Chicken Pasta	Combo for 1 - Combo Popcorn Chicken Pasta	VND	69.000	1 Popcorn Chicken Pasta + 1 Pepsi (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:02:17	2025-06-11 13:13:23.005
19	3	Combo Fried Chicken Pasta	Combo for 1 - Combo Fried Chicken Pasta	VND	45.000	1 Fried Chicken Pasta + 1 Pepsi (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:03:05	2025-06-11 13:13:43.634
20	3	Combo Pasta & Tenders	Combo for 1 - Combo Pasta & Tenders	VND	72.000	1 Popcorn Chicken Pasta + 2 Tenders Chicken + 1 French Fries (R) + 1 Pepsi (STD) + 3 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:03:49	2025-06-11 13:14:00.753
21	3	Combo Pasta & Salad	Combo for 1 - Combo Pasta & Salad	VND	95.000	1 Popcorn Chicken Pasta + 1 Salad Pop + 1 Pepsi (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:04:26	2025-06-11 13:14:18.927
22	3	Combo Fried Chicken Rice	Combo for 1 - Combo Fried Chicken Rice	VND	85.000	1 Fried Chicken Rice + 1 Pepsi (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:05:21	2025-06-11 13:14:45.646
23	3	Combo Flava Fillet Rice	Combo for 1- Combo Flava Fillet Rice	VND	59.000	1 Flava Fillet Rice + 1 Pepsi (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:06:03	2025-06-11 13:15:07.523
24	3	Combo Nanban Rice	Combo for 1 - Combo Nanban Rice	VND	59.000	1 Nanban Popcorn Chicken Rice + 1 Pepsi (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:06:38	2025-06-11 13:15:25.104
25	3	Combo Shrimp Burger	Combo for 1 - Combo Shrimp Burger	VND	49.000	1 Shrimp Burger + 1 Pepsi (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:07:07	2025-06-11 13:16:42.983
26	3	Combo Shrimp Burger & Chicken	Combo for 1 - Combo Shrimp Burger & Chicken	VND	87.000	1 Shrimp Burger + 1 Fried Chicken + 1 Pepsi (STD) + 2 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:08:35	2025-06-11 13:17:14.301
27	3	Combo Burger & Chicken	Combo for 1 - Combo Burger & Chicken	VND	78.000	1 Roasted Fillet Chicken Burger/ Zinger Chicken Burger + 1 Fried Chicken + 1 French Fries (R) + 1 Pepsi (STD) + 3 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:25:34	2025-06-11 13:19:16.015
28	4	Combo Perfect Two (2 pax)	Combo 1 ng?????i - Combo Perfect Two (2 pax)	VND	112.000	2 Fried Chicken + 1 Zinger Chicken Burger + 2 Pepsi (STD) + 3 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:30:42	2025-06-11 13:20:29.574
29	4	Combo Tasty (2 pax)	Combo for sharing - Combo Tasty (2 pax)	VND	135.000	3 Fried Chicken + 1 Popcorn Chicken Pasta + 2 Pepsi (STD) + 4 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:31:44	2025-06-11 13:21:00.993
30	4	Combo Hunger Buster (2 pax)	Combo Nh??m - Combo Hunger Buster (2 pax)	VND	179.000	4 Fried Chicken + 1 Wedges (R) + 2 Pepsi (STD) + 5 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:32:11	2025-06-11 13:21:19.741
31	4	Combo Hunger Buster (2 pax)	Combo Nh??m - Combo Hunger Buster (2 pax)	VND	179.000	4 Fried Chicken + 1 Wedges (R) + 2 Pepsi (STD) + 5 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:32:59	2025-06-11 13:21:46.148
32	4	Combo All-in (3 pax)	Combo Nh??m - Combo All-in (3 pax)	VND	219.000	3 Fried Chicken + 1 Popcorn Chicken Pasta + 1 Shrimp Burger + 1 French Fries (R) + 3 Pepsi (STD)+ 6 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:34:45	2025-06-11 13:22:02.106
33	4	Combo Big Share (5 pax)	Combo Nh??m - Combo Big Share (5 pax)	VND	309.000	6 Fried Chicken + 1 Popcorn Chicken Pasta + 1 Wedges (R) + 5 Pepsi (STD) + 8 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:36:53	2025-06-11 13:22:22.117
34	5	2 Fried Chicken	Fried & Roasted - 2 Fried Chicken	VND	70.000	2 Hot & Spicy Chicken/Original Recipe Chicken/Non Spicy Crispy Chicken + 2 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:39:15	2025-06-11 13:23:44.258
35	4	3 Fried Chicken	Combo for sharing - 3 Fried Chicken	VND	104.000	3 Hot & Spicy Chicken/Original Recipe Chicken/Non Spicy Crispy Chicken + 3 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:39:57	2025-06-11 13:24:12.393
36	4	6 Fried Chicken	Combo for sharing - 6 Fried Chicken	VND	205.000	6 Hot & Spicy Chicken/Original Recipe Chicken/Non Spicy Crispy Chicken + 6 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:40:41	2025-06-11 13:24:43.647
37	4	1 Roasted Fillet	Combo for sharing - 1 Roasted Fillet	VND	42.000	1 Flava Roast Fillet / 1 Pc Black Pepper Fillet	t	2025-06-04 03:41:37	2025-06-11 13:25:04.353
3	7	Seaweed Soup	New products - Seaweed Soup	VND	18.000	Seaweed Soup	t	2025-06-03 14:30:18	2025-06-11 13:26:26.604
9	4	Combo Burger & Chicken	Combo for sharing - Combo Burger & Chicken	VND	170.000	1 Roasted Fillet Chicken Burger/ Zinger Chicken Burger + 1 Fried Chicken + 1 French Fries (R) + 1 Pepsi (STD) + 3 Sachet (Tomato/ Chili sauce)	t	2025-06-03 14:52:45	2025-06-11 13:31:45.236
86	3	Combo Nanban Rice & Soup	Combo for 1 - Combo Nanban Rice & Soup	VND	68.000	1 Nanban Popcorn Chicken Rice + 1 Soup + 1 Pepsi (STD) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-11 13:16:13.199	2025-06-11 13:16:13.199
87	5	1 Fried Chicken	Fried & Roasted - 1 Fried Chicken	VND	36.000	1 Hot & Spicy Chicken/Original Recipe Chicken/Non Spicy Crispy Chicken + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-11 13:23:09.614	2025-06-11 13:23:09.614
39	5	Popcorn (L)	fried - Popcorn (L)	VND	38.000	Popcorn (L) + 2 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:43:24	2025-06-11 13:33:20.566
40	5	3 Pcs KFC Nuggets	Fried -3 Pcs KFC Nuggets	VND	28.000	3 Pcs KFC Nuggets	t	2025-06-04 03:44:06	2025-06-11 13:33:50.202
41	5	5 Pcs KFC Nuggets	Fried - 5 Pcs KFC Nuggets	VND	40.000	5 Pcs KFC Nuggets + 2 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:45:02	2025-06-11 13:34:13.939
42	5	10 Pcs KFC Nuggets	Fried - 10 Pcs KFC Nuggets	VND	40.000	10 Pcs KFC Nuggets + 4 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:45:34	2025-06-11 13:34:34.908
43	5	03 Tenders Chicken	Fried - 03 Tenders Chicken	VND	75.000	3 Tenders Chicken + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:46:09	2025-06-11 13:34:53.857
44	5	05 Tenders Chicken	 Fried - 05 Tenders Chicken	VND	79.000	5 Tenders Chicken +2 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:46:45	2025-06-11 13:35:17.061
45	6	Burger Zinger	Rice  - Burger Zinger	VND	54.000	1 Burger Zinger + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:47:41	2025-06-11 13:35:46.712
46	6	Burger Shrimp	Burger - Burger Shrimp	VND	54.000	1 Burger Shrimp + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:48:34	2025-06-11 13:36:03.594
47	6	Burger Flava	Burger - Burger Flava	VND	54.000	1 Burger Flava + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:49:46	2025-06-11 13:36:29.723
48	6	Teriyaki Rice	Burger - Teriyaki Rice	VND	57.000	1 Teriyaki Rice + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:50:40	2025-06-11 13:36:44.915
49	6	Fried Chicken Rice	Burger - Fried Chicken Rice	VND	49.000	1 Fried Chicken Rice + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:51:37	2025-06-11 13:37:04.295
50	6	Flava Rice	Burger - Flava Rice	VND	49.000	1 Flava Rice + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:52:25	2025-06-11 13:37:18.129
51	6	Rice	 Rice	VND	49.000	Rice	t	2025-06-04 03:53:35	2025-06-11 13:37:34.381
52	6	Rice	Rice	VND	12.000	Rice	t	2025-06-04 03:54:12	2025-06-11 13:37:50.67
53	6	Popcorn Pasta	Rice - Popcorn Pasta	VND	40.000	1 Pasta with Popcorn + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:55:40	2025-06-11 13:38:20.216
54	6	Rice Nanban Pop	Rice - Rice Nanban Pop	VND	64.000	1 Rice Nanban Pop + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 03:56:26	2025-06-11 13:38:40.391
88	6	Fried Chicken Pasta	Rice - Fried Chicken Pasta	VND	64.000	1 Pasta with with Fried Chicken + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-11 13:39:14.241	2025-06-11 13:39:14.241
55	7	Salad Hat	Salad Hat	VND	39.000	1 Salad Hat	t	2025-06-04 03:57:02	2025-06-11 13:39:45.652
56	7	Salad Pop	Salad Pop	VND	39.000	1 Salad Popcorn	t	2025-06-04 07:37:53	2025-06-11 13:40:01.921
57	7	3 Fishsticks	snack - 3 Fishsticks	VND	40.000	3 Fishsticks + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 07:38:44	2025-06-11 13:40:20.991
58	7	4 Chewy Cheese	snack - 4 Chewy Cheese	VND	40.000	4 Chewy Cheese + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 07:39:28	2025-06-11 13:40:39.073
59	7	6 Chewy Cheese	snack - 6 Chewy Cheese	VND	40.000	6 Chewy Cheese + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 07:40:19	2025-06-11 13:40:57.365
60	7	French Fries (L)	snack - French Fries (L)	VND	29.000	French Fries (L) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 07:41:27	2025-06-11 13:41:17.129
61	7	French Fries (J)	snack - French Fries (J)	VND	39.000	French Fries (J) + 2 Sachet (Tomato/ Chili sauce)	t	2025-06-04 07:41:58	2025-06-11 13:41:40.333
62	7	French Fries (J)	snack- French Fries (J)	VND	39.000	French Fries (J) + 2 Sachet (Tomato/ Chili sauce)	t	2025-06-04 07:42:30	2025-06-11 13:42:39.296
63	7	Wedges (Regular)	snack -Wedges (Regular)	VND	39.000	01 Wedges (R)+ 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 07:43:10	2025-06-11 13:42:54.063
64	7	Wedges (Large)	snack - Wedges (Large)	VND	43.000	01 Wedges (L) + 1 Sachet (Tomato/ Chili sauce)	t	2025-06-04 07:43:51	2025-06-11 13:43:12.368
65	7	Mashed Potato (R)	snack -Mashed Potato (R)	VND	43.000	Mashed Potato (R)	t	2025-06-04 07:46:20	2025-06-11 13:43:26.13
66	7	Mashed Potato (L)	snack - Mashed Potato (L)	VND	12.000	Mashed Potato (L)	t	2025-06-04 07:46:58	2025-06-11 13:44:25.139
67	7	Mashed Potato (J)	snack - Mashed Potato (J)	VND	22.000	Mashed Potato (J)	t	2025-06-04 07:47:35	2025-06-11 13:44:43.867
68	7	Coleslaw (R)	snack - Coleslaw (R)	VND	12.000	Coleslaw (R)	t	2025-06-04 07:48:40	2025-06-11 13:44:58.036
69	7	Coleslaw (L)	snack - Coleslaw (L)	VND	12.000	Coleslaw (L)	t	2025-06-04 07:49:14	2025-06-11 13:45:09.584
70	7	Coleslaw (J)	snack- Coleslaw (J)	VND	31.000	Coleslaw (J)	t	2025-06-04 07:49:49	2025-06-11 13:45:28.112
71	5	Pepsi (J)	Fried - Pepsi (J)	VND	31.000	Pepsi (J)	t	2025-06-04 07:50:20	2025-06-11 13:46:00.144
72	7	Seaweed Soup	snack - Seaweed Soup	VND	19.000	Seaweed Soup	t	2025-06-04 07:51:02	2025-06-11 13:46:28.013
74	8	3 Golden Lava Taro	Dessert - 3 Golden Lava Taro	VND	26.000	3 Golden Lava Taro	t	2025-06-04 07:53:49	2025-06-11 14:20:24.461
73	8	2 Golden Lava Taro	Dessert - 2 Golden Lava Taro	VND	34.000	2 Golden Lava Taro	t	2025-06-04 07:52:22	2025-06-11 13:47:15.886
75	8	5 Golden Lava Taro	Dessert - 5 Golden Lava Taro	VND	54.000	5 Golden Lava Taro\n	t	2025-06-04 07:54:21	2025-06-11 14:20:43.342
76	8	Pepsi Can	Dessert - Pepsi Can	VND	19.000	Pepsi Can	t	2025-06-04 07:54:53	2025-06-11 14:21:07.573
77	8	7Up Can	Dessert - 7Up Can	VND	19.000	7Up Can	t	2025-06-04 07:55:36	2025-06-11 14:21:21.77
78	8	Aquafina 500ml	Dessert - Aquafina 500ml	VND	15.000	Aquafina 500ml	t	2025-06-04 07:56:38	2025-06-11 14:21:41.461
79	8	Pepsi Zero Calories Can	Dessert - Pepsi Zero Calories Can	VND	19.000	Pepsi Zero Calories Can	t	2025-06-04 07:57:18	2025-06-11 14:21:59.677
80	8	Sting Can	Dessert - Sting Can	VND	19.000	Sting Can	t	2025-06-04 07:58:55	2025-06-11 14:22:10.435
81	8	Pepsi (STD) - ***Standard: STD	Dessert  - Pepsi (STD) - ***Standard: STD	VND	12.000	Pepsi (STD) - ***Standard: STD	t	2025-06-04 07:59:33	2025-06-11 14:22:33.289
82	8	Pepsi (M)	 Dessert - Pepsi (M)	VND	15.000	Pepsi (M)	t	2025-06-04 08:01:44	2025-06-11 14:22:52.778
83	8	Choco Milk Iced	Dessert - Choco Milk Iced	VND	15.000	Choco Milk Iced	t	2025-06-04 08:02:12	2025-06-11 14:23:09.906
84	8	Pepsi No Sugar (J)	Dessert - Pepsi No Sugar (J)	VND	20.000	Pepsi No Sugar (J)	t	2025-06-04 08:03:39	2025-06-11 14:23:27.503
85	8	Lipton (J)	Dessert - Lipton (J)	VND	21.000	Lipton (J)	t	2025-06-04 08:22:05	2025-06-11 14:23:57.057
\.


--
-- Data for Name: dishlist_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dishlist_images (id, id_dishlist, alt_text, image, create_at, update_at) FROM stdin;
158	54	\N	https://static.kfcvietnam.com.vn/images/items/lg/NANBAN.jpg?v=4pb7k3	2025-06-11 20:38:40.391+07	2025-06-11 20:38:40.391+07
161	56	\N	https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT-GA-VIEN.jpg?v=4pb7k3	2025-06-11 20:40:01.921+07	2025-06-11 20:40:01.921+07
164	59	\N	https://static.kfcvietnam.com.vn/images/items/lg/6-Chewy-Cheese.jpg?v=4pb7k3	2025-06-11 20:40:57.365+07	2025-06-11 20:40:57.365+07
167	62	\N	https://static.kfcvietnam.com.vn/images/items/lg/FF-J.jpg?v=4pb7k3	2025-06-11 20:42:39.296+07	2025-06-11 20:42:39.296+07
170	65	\N	https://static.kfcvietnam.com.vn/images/items/lg/MP-(R)-new.jpg?v=4pb7k3	2025-06-11 20:43:26.13+07	2025-06-11 20:43:26.13+07
173	68	\N	https://static.kfcvietnam.com.vn/images/items/lg/CL-(R)-new.jpg?v=4pb7k3	2025-06-11 20:44:58.036+07	2025-06-11 20:44:58.036+07
176	71	\N	https://static.kfcvietnam.com.vn/images/items/lg/Soup-Rong-Bien.jpg?v=4pb7k3	2025-06-11 20:46:00.144+07	2025-06-11 20:46:00.144+07
179	73	\N	https://static.kfcvietnam.com.vn/images/items/lg/2-taro.jpg?v=4pb7k3	2025-06-11 20:47:15.886+07	2025-06-11 20:47:15.886+07
182	76	\N	https://static.kfcvietnam.com.vn/images/items/lg/PEPSI_CAN.jpg?v=4pb7k3	2025-06-11 21:21:07.573+07	2025-06-11 21:21:07.573+07
185	79	\N	https://static.kfcvietnam.com.vn/images/items/lg/pepsi-zero.jpg?v=4pb7k3	2025-06-11 21:21:59.677+07	2025-06-11 21:21:59.677+07
188	82	\N	https://static.kfcvietnam.com.vn/images/items/lg/PEPSI-M.jpg?v=4pb7k3	2025-06-11 21:22:52.778+07	2025-06-11 21:22:52.778+07
191	85	\N	https://static.kfcvietnam.com.vn/images/items/lg/LIPTON-J.jpg?v=LAVlA4	2025-06-11 21:23:57.057+07	2025-06-11 21:23:57.057+07
192	8	\N	https://static.kfcvietnam.com.vn/images/items/lg/2-taro.jpg?v=LAVlA4	2025-06-24 00:37:06.592+07	2025-06-24 00:37:06.592+07
195	4	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-CHICKEN-1.jpg?v=LAVlA4	2025-06-25 08:33:22.096+07	2025-06-25 08:33:22.096+07
159	88	\N	https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-RAN.jpg?v=LAVlA4	2025-06-11 20:39:14.241+07	2025-06-11 20:39:14.241+07
162	57	\N	https://static.kfcvietnam.com.vn/images/items/lg/3-FISH-STICK.jpg?v=4pb7k3	2025-06-11 20:40:20.991+07	2025-06-11 20:40:20.991+07
165	60	\N	https://static.kfcvietnam.com.vn/images/items/lg/FF-R.jpg?v=4pb7k3	2025-06-11 20:41:17.129+07	2025-06-11 20:41:17.129+07
168	63	\N	https://static.kfcvietnam.com.vn/images/items/lg/khoai-mui-cau-R.jpg?v=4pb7k3	2025-06-11 20:42:54.063+07	2025-06-11 20:42:54.063+07
171	66	\N	https://static.kfcvietnam.com.vn/images/items/lg/MP-(L)-new.jpg?v=4pb7k3	2025-06-11 20:44:25.139+07	2025-06-11 20:44:25.139+07
174	69	\N	https://static.kfcvietnam.com.vn/images/items/lg/CL-(L)-new.jpg?v=4pb7k3	2025-06-11 20:45:09.584+07	2025-06-11 20:45:09.584+07
177	72	\N	https://static.kfcvietnam.com.vn/images/items/lg/Soup-Rong-Bien.jpg?v=LAVlA4	2025-06-11 20:46:28.013+07	2025-06-11 20:46:28.013+07
180	74	\N	https://static.kfcvietnam.com.vn/images/items/lg/3-taro.jpg?v=4pb7k3	2025-06-11 21:20:24.461+07	2025-06-11 21:20:24.461+07
183	77	\N	https://static.kfcvietnam.com.vn/images/items/lg/7UP_CAN.jpg?v=4pb7k3	2025-06-11 21:21:21.77+07	2025-06-11 21:21:21.77+07
186	80	\N	https://static.kfcvietnam.com.vn/images/items/lg/Sting.jpg?v=4pb7k3	2025-06-11 21:22:10.435+07	2025-06-11 21:22:10.435+07
189	83	\N	https://static.kfcvietnam.com.vn/images/items/lg/CHOCO-MILK-STD.jpg?v=4pb7k3	2025-06-11 21:23:09.906+07	2025-06-11 21:23:09.906+07
103	11	\N	https://static.kfcvietnam.com.vn/images/items/lg/yolo-new.jpg?v=LAVlA4	2025-06-11 16:46:29.908+07	2025-06-11 16:46:29.908+07
105	6	\N	https://static.kfcvietnam.com.vn/images/items/lg/Burger-Zinger.jpg?v=LAVlA4	2025-06-11 16:49:19.463+07	2025-06-11 16:49:19.463+07
106	7	\N	https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT.jpg?v=LAVlA4	2025-06-11 16:50:11.169+07	2025-06-11 16:50:11.169+07
107	5	\N	https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET1.jpg?v=LAVlA4	2025-06-11 16:51:20.481+07	2025-06-11 16:51:20.481+07
108	12	\N	https://static.kfcvietnam.com.vn/images/items/lg/yono-new.jpg?v=LKwQDL	2025-06-11 18:31:24.339+07	2025-06-11 18:31:24.339+07
109	13	\N	https://static.kfcvietnam.com.vn/images/items/lg/PHO-MAI.jpg?v=LKwQDL	2025-06-11 18:32:26.607+07	2025-06-11 18:32:26.607+07
110	10	\N	https://static.kfcvietnam.com.vn/images/items/lg/yolo-new.jpg?v=LKwQDL	2025-06-11 20:09:14.704+07	2025-06-11 20:09:14.704+07
111	14	\N	https://static.kfcvietnam.com.vn/images/items/lg/YUZU.jpg?v=LKwQDL	2025-06-11 20:10:32.925+07	2025-06-11 20:10:32.925+07
112	15	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-CHICKEN-2.jpg?v=LKwQDL	2025-06-11 20:11:41.357+07	2025-06-11 20:11:41.357+07
113	16	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-TENDER.jpg?v=LKwQDL	2025-06-11 20:12:21.287+07	2025-06-11 20:12:21.287+07
114	17	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-ROASTED.jpg?v=4pb7k3	2025-06-11 20:12:44.837+07	2025-06-11 20:12:44.837+07
115	18	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-PASTA-POP.jpg?v=4pb7k3	2025-06-11 20:13:23.005+07	2025-06-11 20:13:23.005+07
116	19	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-PASTA-COB.jpg?v=4pb7k3	2025-06-11 20:13:43.634+07	2025-06-11 20:13:43.634+07
117	20	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-PASTA-TENDERS.jpg?v=4pb7k3	2025-06-11 20:14:00.753+07	2025-06-11 20:14:00.753+07
118	21	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-PASTA-SALAD.jpg?v=4pb7k3	2025-06-11 20:14:18.927+07	2025-06-11 20:14:18.927+07
119	22	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-RICE-COB.jpg?v=4pb7k3	2025-06-11 20:14:45.646+07	2025-06-11 20:14:45.646+07
120	23	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-RICE-ROASTED.jpg?v=4pb7k3	2025-06-11 20:15:07.523+07	2025-06-11 20:15:07.523+07
121	24	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-RICE-NANBAN.jpg?v=4pb7k3	2025-06-11 20:15:25.104+07	2025-06-11 20:15:25.104+07
122	86	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-RICE-NANBAN-SOUP.jpg?v=LAVlA4	2025-06-11 20:16:13.199+07	2025-06-11 20:16:13.199+07
123	25	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-SHRIMP.jpg?v=4pb7k3	2025-06-11 20:16:42.983+07	2025-06-11 20:16:42.983+07
124	26	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-B.SHRIMP-COB.jpg?v=4pb7k3	2025-06-11 20:17:14.301+07	2025-06-11 20:17:14.301+07
125	27	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-BURGER-COB-FF.jpg?v=LKwQDL	2025-06-11 20:19:16.015+07	2025-06-11 20:19:16.015+07
126	28	\N	https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET1.jpg?v=LKwQDL	2025-06-11 20:20:29.574+07	2025-06-11 20:20:29.574+07
127	29	\N	https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET5.jpg?v=LKwQDL	2025-06-11 20:21:00.993+07	2025-06-11 20:21:00.993+07
128	30	\N	https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET4.jpg?v=4pb7k3	2025-06-11 20:21:19.741+07	2025-06-11 20:21:19.741+07
129	31	\N	https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET2.jpg?v=4pb7k3	2025-06-11 20:21:46.148+07	2025-06-11 20:21:46.148+07
130	32	\N	https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET3.jpg?v=4pb7k3	2025-06-11 20:22:02.106+07	2025-06-11 20:22:02.106+07
131	33	\N	https://static.kfcvietnam.com.vn/images/items/lg/1-GA-XOT.jpg?v=4pb7k3	2025-06-11 20:22:22.117+07	2025-06-11 20:22:22.117+07
132	87	\N	https://static.kfcvietnam.com.vn/images/items/lg/1-GA-XOT.jpg?v=LAVlA4	2025-06-11 20:23:09.614+07	2025-06-11 20:23:09.614+07
133	34	\N	https://static.kfcvietnam.com.vn/images/items/lg/2-GA-XOT.jpg?v=4pb7k3	2025-06-11 20:23:44.258+07	2025-06-11 20:23:44.258+07
134	35	\N	https://static.kfcvietnam.com.vn/images/items/lg/3-GA-XOT.jpg?v=4pb7k3	2025-06-11 20:24:12.393+07	2025-06-11 20:24:12.393+07
135	36	\N	https://static.kfcvietnam.com.vn/images/items/lg/6-GA-XOT.jpg?v=4pb7k3	2025-06-11 20:24:43.647+07	2025-06-11 20:24:43.647+07
136	37	\N	https://static.kfcvietnam.com.vn/images/items/lg/PHILE-XOT.jpg?v=4pb7k3	2025-06-11 20:25:04.353+07	2025-06-11 20:25:04.353+07
137	3	\N	https://static.kfcvietnam.com.vn/images/items/lg/Soup-Rong-Bien.jpg?v=LAVlA4	2025-06-11 20:26:26.604+07	2025-06-11 20:26:26.604+07
140	1	\N	https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-RAN.jpg?v=LAVlA4	2025-06-11 20:29:16.172+07	2025-06-11 20:29:16.172+07
141	38	\N	https://static.kfcvietnam.com.vn/images/items/lg/POPCORN-XOT.jpg?v=4pb7k3	2025-06-11 20:30:19.96+07	2025-06-11 20:30:19.96+07
142	9	\N	https://static.kfcvietnam.com.vn/images/items/lg/D-BURGER-COB-FF.jpg?v=LAVlA4	2025-06-11 20:31:45.236+07	2025-06-11 20:31:45.236+07
143	39	\N	https://static.kfcvietnam.com.vn/images/items/lg/POP-L.jpg?v=4pb7k3	2025-06-11 20:33:20.566+07	2025-06-11 20:33:20.566+07
144	40	\N	https://static.kfcvietnam.com.vn/images/items/lg/3_Nuggests.jpg?v=4pb7k3	2025-06-11 20:33:50.202+07	2025-06-11 20:33:50.202+07
145	41	\N	https://static.kfcvietnam.com.vn/images/items/lg/5_Nuggests.jpg?v=4pb7k3	2025-06-11 20:34:13.939+07	2025-06-11 20:34:13.939+07
146	42	\N	https://static.kfcvietnam.com.vn/images/items/lg/10_Nuggests.jpg?v=4pb7k3	2025-06-11 20:34:34.908+07	2025-06-11 20:34:34.908+07
147	43	\N	https://static.kfcvietnam.com.vn/images/items/lg/TENDERS-3.jpg?v=4pb7k3	2025-06-11 20:34:53.857+07	2025-06-11 20:34:53.857+07
148	44	\N	https://static.kfcvietnam.com.vn/images/items/lg/TENDERS-5.jpg?v=4pb7k3	2025-06-11 20:35:17.061+07	2025-06-11 20:35:17.061+07
149	45	\N	https://static.kfcvietnam.com.vn/images/items/lg/Burger-Zinger.jpg?v=4pb7k3	2025-06-11 20:35:46.712+07	2025-06-11 20:35:46.712+07
150	46	\N	https://static.kfcvietnam.com.vn/images/items/lg/Burger-Shrimp.jpg?v=4pb7k3	2025-06-11 20:36:03.594+07	2025-06-11 20:36:03.594+07
151	47	\N	https://static.kfcvietnam.com.vn/images/items/lg/Burger-Flava.jpg?v=4pb7k3	2025-06-11 20:36:29.723+07	2025-06-11 20:36:29.723+07
152	48	\N	https://static.kfcvietnam.com.vn/images/items/lg/Rice-Teriyaki.jpg?v=4pb7k3	2025-06-11 20:36:44.915+07	2025-06-11 20:36:44.915+07
153	49	\N	https://static.kfcvietnam.com.vn/images/items/lg/Rice-F.Chicken.jpg?v=4pb7k3	2025-06-11 20:37:04.295+07	2025-06-11 20:37:04.295+07
154	50	\N	https://static.kfcvietnam.com.vn/images/items/lg/Rice-Flava.jpg?v=4pb7k3	2025-06-11 20:37:18.129+07	2025-06-11 20:37:18.129+07
155	51	\N	https://static.kfcvietnam.com.vn/images/items/lg/Rice.jpg?v=4pb7k3	2025-06-11 20:37:34.381+07	2025-06-11 20:37:34.381+07
156	52	\N	https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-VIEN.jpg?v=4pb7k3	2025-06-11 20:37:50.67+07	2025-06-11 20:37:50.67+07
157	53	\N	https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-VIEN.jpg?v=LAVlA4	2025-06-11 20:38:20.216+07	2025-06-11 20:38:20.216+07
160	55	\N	https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT.jpg?v=4pb7k3	2025-06-11 20:39:45.652+07	2025-06-11 20:39:45.652+07
163	58	\N	https://static.kfcvietnam.com.vn/images/items/lg/4-Chewy-Cheese.jpg?v=4pb7k3	2025-06-11 20:40:39.073+07	2025-06-11 20:40:39.073+07
166	61	\N	https://static.kfcvietnam.com.vn/images/items/lg/FF-L.jpg?v=4pb7k3	2025-06-11 20:41:40.333+07	2025-06-11 20:41:40.333+07
169	64	\N	https://static.kfcvietnam.com.vn/images/items/lg/khoai-mui-cau-L.jpg?v=4pb7k3	2025-06-11 20:43:12.368+07	2025-06-11 20:43:12.368+07
172	67	\N	https://static.kfcvietnam.com.vn/images/items/lg/MP-(J)-new.jpg?v=4pb7k3	2025-06-11 20:44:43.867+07	2025-06-11 20:44:43.867+07
175	70	\N	https://static.kfcvietnam.com.vn/images/items/lg/CL-(J)-new.jpg?v=4pb7k3	2025-06-11 20:45:28.112+07	2025-06-11 20:45:28.112+07
181	75	\N	https://static.kfcvietnam.com.vn/images/items/lg/5-taro.jpg?v=4pb7k3	2025-06-11 21:20:43.342+07	2025-06-11 21:20:43.342+07
184	78	\N	https://static.kfcvietnam.com.vn/images/items/lg/AQUAFINA.jpg?v=4pb7k3	2025-06-11 21:21:41.461+07	2025-06-11 21:21:41.461+07
187	81	\N	https://static.kfcvietnam.com.vn/images/items/lg/PEPSI-STD.jpg?v=4pb7k3	2025-06-11 21:22:33.289+07	2025-06-11 21:22:33.289+07
190	84	\N	https://static.kfcvietnam.com.vn/images/items/lg/PEPSI-ZERO-J.jpg?v=4pb7k3	2025-06-11 21:23:27.503+07	2025-06-11 21:23:27.503+07
194	2	\N	https://static.kfcvietnam.com.vn/images/items/lg/ChoCo_Hot.jpg?v=LAVlA4	2025-06-24 11:52:01.867+07	2025-06-24 11:52:01.867+07
\.


--
-- Data for Name: order_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_details (id, quantity, price, note, id_dishlist, id_order, create_at, update_at) FROM stdin;
11	1	133.000	g???i nhanh cho t??i 30 ph??t	13	14	2025-06-11 21:40:41.12+07	2025-06-11 21:40:41.12+07
12	1	59.000	bo nhieu da	4	15	2025-06-12 16:36:59.558+07	2025-06-12 16:36:59.558+07
13	1	18.000	goi nhanh	3	16	2025-06-14 14:15:42.126+07	2025-06-14 14:15:42.126+07
14	1	85.000	g???i nhanh	17	17	2025-06-14 14:22:45.678+07	2025-06-14 14:22:45.678+07
15	1	95.000	bbbbbb	16	18	2025-06-14 14:27:42.81+07	2025-06-14 14:27:42.81+07
16	1	59.000	sq	4	19	2025-06-14 14:29:29.777+07	2025-06-14 14:29:29.777+07
17	1	69.000	bbbbbb	18	20	2025-06-14 14:29:50.086+07	2025-06-14 14:29:50.086+07
18	1	95.000	sss	21	21	2025-06-14 14:30:40.114+07	2025-06-14 14:30:40.114+07
19	1	78.000	alo	27	22	2025-06-14 21:59:09.414+07	2025-06-14 21:59:09.414+07
20	4	69.000	aaaaa	18	23	2025-06-14 22:01:12.982+07	2025-06-14 22:01:12.982+07
21	1	85.000	alo	17	24	2025-06-14 22:04:27.11+07	2025-06-14 22:04:27.11+07
22	1	85.000	abc	17	25	2025-06-14 22:08:59.151+07	2025-06-14 22:08:59.151+07
23	2	85.000	ssss	22	26	2025-06-14 23:33:08.375+07	2025-06-14 23:33:08.375+07
24	1	85.000	alo	17	27	2025-06-14 23:34:32.274+07	2025-06-14 23:34:32.274+07
25	2	85.000	g???i nhanh	17	28	2025-06-15 00:31:22.4+07	2025-06-15 00:31:22.4+07
26	2	85.000	g???i nhanh cho t??i 30 ph??t	22	29	2025-06-15 13:08:51.726+07	2025-06-15 13:08:51.726+07
27	2	85.000	bbbbbbbbbb	17	30	2025-06-15 13:54:05.602+07	2025-06-15 13:54:05.602+07
29	3	95.000	g???i nhanh	16	32	2025-06-16 08:50:01.521+07	2025-06-16 08:50:01.521+07
30	1	85.000	bbbbb	17	33	2025-06-16 09:32:22.586+07	2025-06-16 09:32:22.586+07
31	2	95.000	nhi???u t????ng	16	34	2025-06-16 09:43:21.989+07	2025-06-16 09:43:21.989+07
32	4	95.000	g???i nhanh	16	35	2025-06-16 10:26:43.13+07	2025-06-16 10:26:43.13+07
33	2	69.000	sqqs	18	36	2025-06-16 10:48:02.587+07	2025-06-16 10:48:02.587+07
34	2	85.000	sqsqs	17	37	2025-06-16 14:55:22.697+07	2025-06-16 14:55:22.697+07
40	1	85.000	ok	17	43	2025-06-16 21:12:08.802+07	2025-06-16 21:12:08.802+07
41	1	85.000	th??nh c??ng	17	44	2025-06-16 21:31:50.96+07	2025-06-16 21:31:50.96+07
42	1	85.000	nh??? h??m n??ng	17	45	2025-06-16 21:49:31.056+07	2025-06-16 21:49:31.056+07
43	2	85.000	aaaaaaaaaa	17	46	2025-06-16 21:56:46.084+07	2025-06-16 21:56:46.084+07
44	1	85.000	ssqsq	17	47	2025-06-16 21:58:06.663+07	2025-06-16 21:58:06.663+07
45	1	85.000	sqsq	17	48	2025-06-16 22:01:35.164+07	2025-06-16 22:01:35.164+07
46	1	95.000	11111111111111	16	49	2025-06-16 22:05:33.423+07	2025-06-16 22:05:33.423+07
47	2	85.000	abc	17	50	2025-06-16 22:07:54.221+07	2025-06-16 22:07:54.221+07
48	2	85.000	abc	17	51	2025-06-16 22:07:56.2+07	2025-06-16 22:07:56.2+07
49	2	85.000	abc	17	52	2025-06-16 22:08:12.835+07	2025-06-16 22:08:12.835+07
50	2	85.000	abc	17	53	2025-06-16 22:08:16.618+07	2025-06-16 22:08:16.618+07
51	2	85.000	abc	17	54	2025-06-16 22:08:16.892+07	2025-06-16 22:08:16.892+07
52	1	95.000	sqsq	16	55	2025-06-16 22:09:06.18+07	2025-06-16 22:09:06.18+07
53	2	85.000	bbbb	17	56	2025-06-16 22:16:23.895+07	2025-06-16 22:16:23.895+07
54	1	85.000	1212	17	57	2025-06-16 22:17:03.889+07	2025-06-16 22:17:03.889+07
55	1	85.000	sqsq	17	58	2025-06-16 22:17:38.953+07	2025-06-16 22:17:38.953+07
56	1	85.000	roasted	17	59	2025-06-16 22:27:34.215+07	2025-06-16 22:27:34.215+07
57	1	85.000	sqsq	17	60	2025-06-16 22:29:31.791+07	2025-06-16 22:29:31.791+07
58	1	85.000	bbbbbb	17	61	2025-06-16 22:32:03.362+07	2025-06-16 22:32:03.362+07
59	1	85.000	sqqsq	17	62	2025-06-16 22:33:32.555+07	2025-06-16 22:33:32.555+07
60	1	85.000	3322	17	63	2025-06-16 22:41:31.624+07	2025-06-16 22:41:31.624+07
61	1	85.000	??ssas	17	64	2025-06-16 22:47:52.224+07	2025-06-16 22:47:52.224+07
62	1	95.000	ngon nhanh	16	65	2025-06-16 22:48:42.919+07	2025-06-16 22:48:42.919+07
63	1	85.000	sqsq	17	66	2025-06-16 23:20:18.626+07	2025-06-16 23:20:18.626+07
64	1	85.000	n???u nhanh	17	67	2025-06-16 23:26:15.291+07	2025-06-16 23:26:15.291+07
65	1	85.000	bbbbbbbbbb	17	68	2025-06-16 23:42:26.721+07	2025-06-16 23:42:26.721+07
66	1	85.000	ok	17	69	2025-06-17 09:33:26.984+07	2025-06-17 09:33:26.984+07
67	1	72.000	1111	20	70	2025-06-17 10:08:59.802+07	2025-06-17 10:08:59.802+07
68	1	95.000	g???i nhanh	16	71	2025-06-17 10:40:55.763+07	2025-06-17 10:40:55.763+07
69	1	95.000	goi nhanh	16	72	2025-06-17 11:09:46.527+07	2025-06-17 11:09:46.527+07
70	1	95.000	111	16	73	2025-06-17 11:10:52.198+07	2025-06-17 11:10:52.198+07
71	1	26.000	pho mai nhi???u	74	74	2025-06-21 14:52:11.929+07	2025-06-21 14:52:11.929+07
72	1	104.000	121212121	35	76	2025-06-23 19:57:09.231+07	2025-06-23 19:57:09.231+07
73	1	85.000	giao nhanh	17	31	2025-06-24 15:07:28.624+07	2025-06-24 15:07:28.624+07
74	1	42000.000	khong beo	1	77	2025-06-24 15:32:16.153+07	2025-06-24 15:32:16.153+07
75	1	42000.000	khong beo	1	78	2025-06-24 15:51:56.419+07	2025-06-24 15:51:56.419+07
79	1	85.000	ssss	17	39	2025-06-24 23:52:07.728+07	2025-06-24 23:52:07.728+07
80	1	85.000	sqqsq	17	38	2025-06-24 23:52:20.4+07	2025-06-24 23:52:20.4+07
81	1	42000.000	khong beo	1	75	2025-06-24 23:52:42.341+07	2025-06-24 23:52:42.341+07
82	8	85.000	bbbbb	17	40	2025-06-24 23:53:31.134+07	2025-06-24 23:53:31.134+07
83	1	29.000	giao nhanh	3	13	2025-06-24 23:55:28.169+07	2025-06-24 23:55:28.169+07
86	2	29.000	g???i nhanh cho t??i 30 ph??t	2	12	2025-06-25 00:02:38.35+07	2025-06-25 00:02:38.35+07
90	1	95.000	sqsq	21	42	2025-06-25 00:07:24.665+07	2025-06-25 00:07:24.665+07
91	1	85.000	12	17	41	2025-06-25 00:07:30.846+07	2025-06-25 00:07:30.846+07
92	2	54.000	nhi???u slack	6	79	2025-06-25 08:31:25.055+07	2025-06-25 08:31:25.055+07
93	1	133.000	giao nhanh	13	80	2025-06-25 20:28:56.656+07	2025-06-25 20:28:56.656+07
\.


--
-- Data for Name: order_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_table (id, user_id, address, customer_note, customer_name, customer_phone, total_price, status, paid, process, create_at, update_at) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, fullname, email, phone_number, address, password, create_at, status, rule) FROM stdin;
4	nguyentructhuytien	nguyentructhuytien123@gmail.com	0987654321	89A/3A	794c2def4643e938c644915eabc7cf04	2025-06-14 12:05:28.76+07	t	customer
5	Nguy???n Tr??c Th??y Ti??n	nguyencaokyduyen421@gmail.com	0978285940	sai g??n quan 8	e10adc3949ba59abbe56e057f20f883e	2025-06-14 14:08:17.617+07	t	customer
6	V?? th??? th??y d????ng 	vothithuyduong01250@gmail.com	0352138400	sai g??n quan 8	e10adc3949ba59abbe56e057f20f883e	2025-06-14 14:13:49.828+07	t	customer
7	Nguy???n Tr??c Th??y Ti??n	nguyentructhuytien1@gmail.com	0976723889	Th??nh ph??? Phan Rang-Th??p Ch??m	e10adc3949ba59abbe56e057f20f883e	2025-06-15 10:42:16.863+07	t	customer
8	Nguy???n Tr??c Th??y Ti??n	nguyentructhuytien2@gmail.com	0352138400	Th??nh ph??? Phan Rang-Th??p Ch??m	e10adc3949ba59abbe56e057f20f883e	2025-06-16 18:02:48.502+07	t	customer
1	ngovanquoc	ronaldo321@gmail.com	0987654321	89A/3A	ad70f4bc1c44e7b2a395262d69272653	2025-06-09 14:05:44.075+07	t	customer
2	ngovanquoc	ngovanquoc480@gmail.com	0978285940	Th??nh ph??? Phan Rang-Th??p Ch??m	9007f6e9f7f3f8e607fc44340147a82b	2025-06-09 16:29:11.001+07	t	customer
3	vothithuyduong	vothithuyduong123@gmail.com	0987654321	89A/3A	322f390810ade59dd1548a4ca80956d4	2025-06-13 13:48:25.178+07	t	customer
10	adminQuoc	admin@gmail.com	0978285940	89A/3A	e10adc3949ba59abbe56e057f20f883e	2025-06-23 17:26:06.044+07	t	admin
11	adminQuoc1	admin111@gmail.com	0978285940	89A/3A	e10adc3949ba59abbe56e057f20f883e	2025-06-24 15:31:51.823+07	t	\N
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 1, true);


--
-- Name: dishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dishlist_id_seq', 88, true);


--
-- Name: dishlist_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dishlist_images_id_seq', 195, true);


--
-- Name: order_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_details_id_seq', 93, true);


--
-- Name: order_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_table_id_seq', 80, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 11, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: dishlist_images dishlist_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishlist_images
    ADD CONSTRAINT dishlist_images_pkey PRIMARY KEY (id);


--
-- Name: dishlist dishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishlist
    ADD CONSTRAINT dishlist_pkey PRIMARY KEY (id);


--
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);


--
-- Name: order_table order_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT order_table_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: idx_order_details_id_dishlist; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_details_id_dishlist ON public.order_details USING btree (id_dishlist);


--
-- Name: idx_order_details_id_order; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_details_id_order ON public.order_details USING btree (id_order);


--
-- Name: dishlist fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishlist
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: order_table fk_order_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

