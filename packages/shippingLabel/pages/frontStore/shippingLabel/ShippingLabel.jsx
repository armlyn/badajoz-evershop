import React, { useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import './ShippingLabel.scss';
import html2pdf from 'html2pdf.js';
import { useQuery } from 'urql';
import {mapResponseToData} from './utils/filterUtilShipping';


const identify= 'c4ad97aa-ca75-4177-806a-1097ff6327fc'
const OrderQuery = `
{
  order(uuid: "${identify}") {
    orderId
    uuid
    orderNumber
    createdAt{
      value
    }
    items {
      qty
    }
    shippingAddress {
      orderAddressId
      uuid
      fullName
      postcode
      telephone
      city
      address1
      address2
      country {
        name
      }
      province {
        name
      }
    }
    currency
    customerEmail
    totalQty
    grandTotal{
      value
    }
    shipment {
      carrier
      trackingNumber
    }
    shippingNote
    }
}`


const badajozimg="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRvcjogQ29yZWxEUkFXIFg3IC0tPgoKPHN2ZwogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICB3aWR0aD0iMTI5Ljg1N21tIgogICBoZWlnaHQ9IjExMi40OG1tIgogICB2ZXJzaW9uPSIxLjEiCiAgIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyB0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IGltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7IGZpbGwtcnVsZTpldmVub2RkOyBjbGlwLXJ1bGU6ZXZlbm9kZCIKICAgdmlld0JveD0iMCAwIDEyOTg2IDExMjQ4IgogICBpZD0ic3ZnMjciCiAgIHNvZGlwb2RpOmRvY25hbWU9ImxvZ29fZGlwdXRhY2lvbl9jb2xvcl8wMDEuc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjEuMiAoMGEwMGNmNTMzOSwgMjAyMi0wMi0wNCkiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHNvZGlwb2RpOm5hbWVkdmlldwogICBpZD0ibmFtZWR2aWV3MjkiCiAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIgogICBzaG93Z3JpZD0iZmFsc2UiCiAgIGlua3NjYXBlOnpvb209IjEuNDc3MjI1NSIKICAgaW5rc2NhcGU6Y3g9IjI0NS4zOTI0NSIKICAgaW5rc2NhcGU6Y3k9IjIxMi4yMjIxNiIKICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0iQ2FwYV94MDAyMF8xIiAvPgogPGRlZnMKICAgaWQ9ImRlZnM0Ij4KICA8c3R5bGUKICAgdHlwZT0idGV4dC9jc3MiCiAgIGlkPSJzdHlsZTIiPgogICA8IVtDREFUQVsKICAgIC5maWwyIHtmaWxsOm5vbmV9CiAgICAuZmlsMCB7ZmlsbDojMkUyRTJEfQogICAgLmZpbDEge2ZpbGw6I0M1MUIxQn0KICAgXV0+CiAgPC9zdHlsZT4KIDwvZGVmcz4KIDxnCiAgIGlkPSJDYXBhX3gwMDIwXzEiCiAgIGlua3NjYXBlOmxhYmVsPSJDYXBhIDEiPgogIDxtZXRhZGF0YQogICBpZD0iQ29yZWxDb3JwSURfMENvcmVsLUxheWVyIiAvPgogIDxnCiAgIGlkPSJfMjMyMjI4OTg1NzQ4OCI+CiAgIDxnCiAgIGlkPSJnMjEiPgogICAgPHBhdGgKICAgY2xhc3M9ImZpbDAiCiAgIGQ9Ik05OTc2IDY1NTdsMjI4IDAgNTQzIDgyOSAwIC04MjkgMjM5IDAgMCAxMjYwIC0yMzAgMCAtNTQxIC04MjYgMCA4MjYgLTIzOSAwIDAgLTEyNjB6bS02OTYgLTQzNGwyNzcgMCAtMzE0IDMzNiAtMTY3IDAgMjA0IC0zMzZ6bS00OSA2MzhjLTExNiwwIC0yMTQsNDAgLTI5MywxMjEgLTc5LDgxIC0xMTksMTg0IC0xMTksMzEwIDAsMTM5IDUwLDI0OSAxNTAsMzMwIDc3LDY0IDE2Niw5NSAyNjYsOTUgMTE0LDAgMjEwLC00MSAyOTAsLTEyMyA4MCwtODIgMTE5LC0xODQgMTE5LC0zMDQgMCwtMTIwIC00MCwtMjIyIC0xMjAsLTMwNSAtODAsLTgzIC0xNzgsLTEyNCAtMjkzLC0xMjR6bTMgLTIzNmMxNzksMCAzMzIsNjUgNDYwLDE5NCAxMjksMTI5IDE5MywyODYgMTkzLDQ3MiAwLDE4NCAtNjQsMzQwIC0xOTAsNDY3IC0xMjcsMTI3IC0yODAsMTkxIC00NjEsMTkxIC0xODksMCAtMzQ2LC02NSAtNDcxLC0xOTYgLTEyNSwtMTMxIC0xODgsLTI4NiAtMTg4LC00NjYgMCwtMTIxIDI5LC0yMzIgODcsLTMzMyA1OSwtMTAxIDEzOSwtMTgxIDI0MSwtMjQwIDEwMiwtNTkgMjEyLC04OSAzMjksLTg5em0tOTYzIDMybDIzOSAwIDAgMTI2MCAtMjM5IDAgMCAtMTI2MHptLTUyIDIyMWwtMTY4IDE2MGMtMTE1LC0xMjEgLTI0MywtMTgxIC0zODYsLTE4MSAtMTIxLDAgLTIyMyw0MSAtMzA1LDEyMyAtODMsODMgLTEyNCwxODQgLTEyNCwzMDUgMCw4NCAxOCwxNTggNTUsMjIzIDM2LDY1IDg4LDExNyAxNTUsMTU0IDY3LDM3IDE0MSw1NSAyMjMsNTUgNzAsMCAxMzMsLTEzIDE5MSwtMzkgNTgsLTI2IDEyMSwtNzMgMTkxLC0xNDJsMTYzIDE3MWMtOTQsOTEgLTE4MiwxNTQgLTI2NCwxODkgLTgzLDM2IC0xNzgsNTMgLTI4NCw1MyAtMTk2LDAgLTM1NywtNjIgLTQ4MiwtMTg2IC0xMjUsLTEyNCAtMTg3LC0yODQgLTE4NywtNDc4IDAsLTEyNiAyOCwtMjM3IDg1LC0zMzUgNTcsLTk4IDEzOCwtMTc2IDI0NSwtMjM2IDEwNiwtNTkgMjIwLC04OSAzNDIsLTg5IDEwNCwwIDIwNCwyMiAzMDEsNjYgOTYsNDQgMTc5LDEwNiAyNDksMTg3em0tMTgxMSAxMTRsLTE3MSA0MzQgMzQxIDAgLTE3MCAtNDM0em0tMTIxIC0zMzVsMjQyIDAgNDg1IDEyNjAgLTI1MCAwIC05OCAtMjU5IC01MTcgMCAtMTAxIDI1OSAtMjQ5IDAgNDg4IC0xMjYwem0tMTEwNiAwbDY5NyAwIDAgMjM3IC0yMzAgMCAwIDEwMjMgLTI0NCAwIDAgLTEwMjMgLTIyMyAwIDAgLTIzN3ptLTg2OSAwbDI0MCAwIDAgODE1YzAsNzEgNywxMjAgMTksMTQ5IDEyLDMwIDMyLDUzIDYxLDcwIDI4LDE4IDYyLDI2IDEwMiwyNiA0MywwIDc5LC05IDExMCwtMjkgMzAsLTE5IDUxLC00NCA2MywtNzQgMTIsLTMwIDE4LC04NyAxOCwtMTcybDAgLTc4NSAyNDAgMCAwIDc1MWMwLDEyNyAtNywyMTUgLTIxLDI2NCAtMTUsNDkgLTQyLDk3IC04MiwxNDIgLTQwLDQ2IC04Nyw4MCAtMTM5LDEwMiAtNTMsMjIgLTExNCwzMyAtMTg0LDMzIC05MSwwIC0xNzEsLTIxIC0yMzgsLTYzIC02OCwtNDIgLTExNiwtOTQgLTE0NiwtMTU4IC0yOSwtNjMgLTQzLC0xNjkgLTQzLC0zMjBsMCAtNzUxem0tNTk3IDQ5M2w3NyAwYzYwLDAgMTAyLC00IDEyNiwtMTMgMjMsLTggNDIsLTIyIDU2LC00MiAxMywtMjAgMjAsLTQ0IDIwLC03MyAwLC00OSAtMTksLTg0IC01NywtMTA2IC0yOCwtMTcgLTc5LC0yNiAtMTU0LC0yNmwtNjggMCAwIDI2MHptLTIzOSAtNDkzbDI1NSAwYzEzOCwwIDIzNywxMiAyOTgsMzggNjAsMjUgMTA5LDY3IDE0NCwxMjMgMzUsNTcgNTMsMTI1IDUzLDIwNSAwLDg4IC0yNCwxNjEgLTcwLDIxOSAtNDYsNTkgLTEwOCw5OSAtMTg4LDEyMiAtNDYsMTMgLTEzMSwyMCAtMjUzLDIwbDAgNTMzIC0yMzkgMCAwIC0xMjYwem0tMzY3IDBsMjM5IDAgMCAxMjYwIC0yMzkgMCAwIC0xMjYwem0tODMxIDIzMmwwIDc5NSAxMTEgMGMxMTAsMCAxODksLTEzIDIzOSwtMzggNDksLTI1IDg5LC02NyAxMjEsLTEyNyAzMSwtNTkgNDcsLTEzMiA0NywtMjIwIDAsLTEzMyAtMzgsLTIzNyAtMTEyLC0zMTEgLTY3LC02NiAtMTc2LC05OSAtMzI1LC05OWwtODEgMHptLTIzOSAtMjMybDI4NCAwYzE4MywwIDMyMCwyMyA0MDksNjggODksNDUgMTYyLDExOSAyMjAsMjIyIDU3LDEwMiA4NiwyMjEgODYsMzU4IDAsOTcgLTE2LDE4NiAtNDgsMjY3IC0zMiw4MiAtNzcsMTQ5IC0xMzQsMjAzIC01Nyw1NCAtMTE4LDkxIC0xODQsMTEyIC02NiwyMCAtMTgxLDMwIC0zNDQsMzBsLTI4OSAwIDAgLTEyNjB6bTgxODIgMTQxNGw3NzMgMCAtNDU2IDEwNDIgNDI2IDAgMCAyMzUgLTc4MSAwIDQ1NCAtMTAzNyAtNDE2IDAgMCAtMjQwem0tNjg2IDIwNmMtMTE4LDAgLTIxNyw0MSAtMjk3LDEyMyAtODAsODMgLTEyMCwxODcgLTEyMCwzMTQgMCwxNDEgNTAsMjUzIDE1MSwzMzUgNzksNjQgMTY5LDk2IDI3MCw5NiAxMTUsMCAyMTMsLTQyIDI5NCwtMTI1IDgwLC04MyAxMjEsLTE4NiAxMjEsLTMwOCAwLC0xMjIgLTQxLC0yMjQgLTEyMiwtMzA5IC04MiwtODQgLTE4MSwtMTI2IC0yOTcsLTEyNnptMyAtMjM4YzE4MSwwIDMzNiw2NSA0NjYsMTk2IDEzMCwxMzEgMTk1LDI5MCAxOTUsNDc4IDAsMTg3IC02NCwzNDQgLTE5Miw0NzMgLTEyOCwxMjkgLTI4NCwxOTQgLTQ2NywxOTQgLTE5MiwwIC0zNTEsLTY2IC00NzcsLTE5OSAtMTI3LC0xMzIgLTE5MSwtMjkwIC0xOTEsLTQ3MiAwLC0xMjIgMzAsLTIzNCA4OSwtMzM3IDU5LC0xMDIgMTQwLC0xODQgMjQzLC0yNDMgMTA0LC02MCAyMTUsLTkwIDMzNCwtOTB6bS05OTcgMzJsMjQ0IDAgMCA4NDdjMCwxMzUgLTExLDIzMCAtMzIsMjg0IC0yMiw1NCAtNTcsOTggLTEwNiwxMzAgLTQ5LDMyIC0xMDgsNDggLTE3Nyw0OCAtMTM5LDAgLTI1OSwtNjIgLTM1OCwtMTg1bDE3NSAtMTY1YzM4LDQ1IDcxLDc0IDk4LDg5IDI4LDE1IDU0LDIzIDc5LDIzIDI2LDAgNDUsLTExIDU4LC0zMyAxMywtMjIgMTksLTcxIDE5LC0xNDVsMCAtODkzem0tOTc3IDMzOWwtMTczIDQ0MCAzNDUgMCAtMTcyIC00NDB6bS0xMjMgLTMzOWwyNDUgMCA0OTIgMTI3NyAtMjUzIDAgLTEwMCAtMjYzIC01MjQgMCAtMTAyIDI2MyAtMjUyIDAgNDk0IC0xMjc3em0tMTI1MCAyMzVsMCA4MDUgMTEyIDBjMTEyLDAgMTkyLC0xMiAyNDIsLTM4IDUwLC0yNSA5MSwtNjggMTIzLC0xMjkgMzIsLTYwIDQ4LC0xMzQgNDgsLTIyMiAwLC0xMzYgLTM4LC0yNDEgLTExNCwtMzE2IC02OCwtNjcgLTE3OCwtMTAwIC0zMjksLTEwMGwtODIgMHptLTI0MiAtMjM1bDI4OCAwYzE4NSwwIDMyMywyMyA0MTQsNjkgOTAsNDYgMTY0LDEyMCAyMjMsMjI0IDU4LDEwNCA4NywyMjUgODcsMzYzIDAsOTkgLTE2LDE4OSAtNDksMjcxIC0zMiw4MyAtNzgsMTUxIC0xMzUsMjA2IC01OCw1NCAtMTIwLDkyIC0xODcsMTEzIC02NywyMSAtMTgzLDMxIC0zNDksMzFsLTI5MiAwIDAgLTEyNzd6bS02NjIgMzM5bC0xNzQgNDQwIDM0NiAwIC0xNzIgLTQ0MHptLTEyMyAtMzM5bDI0NSAwIDQ5MSAxMjc3IC0yNTMgMCAtOTkgLTI2MyAtNTI0IDAgLTEwMiAyNjMgLTI1MyAwIDQ5NSAtMTI3N3ptLTEwNDAgNzE4bDAgMzI4IDYxIDBjMTAzLDAgMTcyLC0xMyAyMDcsLTM5IDM2LC0yNSA1NCwtNjIgNTQsLTExMSAwLC01NSAtMjEsLTk4IC02MywtMTMwIC00MiwtMzIgLTExMSwtNDggLTIwOCwtNDhsLTUxIDB6bTAgLTQ4N2wwIDI3MCA1NCAwYzYwLDAgMTA2LC0xMiAxMzUsLTM3IDI5LC0yNSA0NCwtNTkgNDQsLTEwMiAwLC00MCAtMTQsLTcyIC00MiwtOTYgLTI4LC0yMyAtNzAsLTM1IC0xMjcsLTM1bC02NCAwem0tMjQyIDEwNDZsMCAtMTI3NyAyMDEgMGMxMTcsMCAyMDMsNyAyNTcsMjIgNzcsMjEgMTM4LDU4IDE4MywxMTMgNDYsNTUgNjksMTIwIDY5LDE5NSAwLDQ5IC0xMSw5MyAtMzEsMTMzIC0yMSwzOSAtNTQsNzcgLTEwMCwxMTEgNzcsMzcgMTM0LDgyIDE2OSwxMzcgMzYsNTUgNTQsMTE5IDU0LDE5NCAwLDcyIC0xOSwxMzcgLTU2LDE5NiAtMzcsNTkgLTg1LDEwMyAtMTQ0LDEzMiAtNTgsMjkgLTEzOSw0NCAtMjQzLDQ0bC0zNTkgMHptLTEwNzEgLTkzOGw1MTIgMCAwIDE3NSAtMzM1IDAgMCAxNjggMzM1IDAgMCAxNzMgLTMzNSAwIDAgMjQ3IDMzNSAwIDAgMTc1IC01MTIgMCAwIC05Mzh6bS02MzMgMTcybDAgNTkyIDgzIDBjODEsMCAxNDAsLTkgMTc3LC0yOCAzNywtMTkgNjcsLTUwIDkwLC05NCAyNCwtNDUgMzUsLTk5IDM1LC0xNjQgMCwtMTAwIC0yOCwtMTc3IC04MywtMjMyIC01MCwtNDkgLTEzMSwtNzQgLTI0MiwtNzRsLTYwIDB6bS0xNzggLTE3MmwyMTIgMGMxMzYsMCAyMzcsMTcgMzA0LDUwIDY2LDM0IDEyMSw4OSAxNjMsMTY1IDQzLDc2IDY1LDE2NSA2NSwyNjcgMCw3MiAtMTIsMTM5IC0zNiwxOTkgLTI0LDYxIC01OCwxMTEgLTEwMCwxNTEgLTQyLDQwIC04OCw2OCAtMTM3LDgzIC00OSwxNSAtMTM1LDIzIC0yNTYsMjNsLTIxNSAwIDAgLTkzOHoiCiAgIGlkPSJwYXRoNyIKICAgc3R5bGU9ImZpbGw6IzAwMDAwMCIgLz4KICAgIDxwYXRoCiAgIGNsYXNzPSJmaWwxIgogICBkPSJNNDE0NiA0NTE5YzEzMzcsLTk3NCAzMTM0LC0xMTc2IDQ2MzksLTQ2NiAzNTEsMTY2IC02MSw3MTEgLTM1NCw1NTEgLTEwMjMsLTU1OSAtMjkwOCwtNjE5IC00MjEzLDE5IC0xMzAsNjMgLTIwOSwtNCAtNzIsLTEwNHoiCiAgIGlkPSJwYXRoOSIgLz4KICAgIDxwYXRoCiAgIGNsYXNzPSJmaWwxIgogICBkPSJNNDU5NiA1MDgxYzEwNTgsLTY4MiAyNTEwLC04MDAgMzY2OCwtMjIxIDI1MCwxMjUgLTU3LDUzMCAtMjk5LDQwOSAtOTQ2LC00NzAgLTIzNTQsLTU0MSAtMzMzOSwtOTkgLTEzMCw1OCAtMTY5LDAgLTMwLC04OXoiCiAgIGlkPSJwYXRoMTEiIC8+CiAgICA8cGF0aAogICBjbGFzcz0iZmlsMSIKICAgZD0iTTQ5OTMgNTY5N2M3OTUsLTU0NiAxOTIzLC02NTggMjgxMiwtMjE3IDI0OSwxMjMgLTE5LDQwNCAtMTk2LDMxNCAtNzMyLC0zNjggLTE4NDYsLTQxMiAtMjU5MiwtNDUgLTYyLDMxIC05NSwtMyAtMjQsLTUyeiIKICAgaWQ9InBhdGgxMyIgLz4KICAgIDxwYXRoCiAgIGNsYXNzPSJmaWwxIgogICBkPSJNODE5MCAzNTAxYy0yMzMsMCAtNDIxLC0xODggLTQyMSwtNDIxIDAsLTIzMyAxODgsLTQyMSA0MjEsLTQyMSAyMzMsMCA0MjEsMTg4IDQyMSw0MjEgMCwyMzMgLTE4OCw0MjEgLTQyMSw0MjF6IgogICBpZD0icGF0aDE1IiAvPgogICAgPHBhdGgKICAgY2xhc3M9ImZpbDEiCiAgIGQ9Ik00ODA0IDM1MDBjMjMzLDAgNDIyLC0xODggNDIyLC00MjEgMCwtMjMzIC0xODksLTQyMiAtNDIyLC00MjIgLTIzMiwwIC00MjEsMTg5IC00MjEsNDIyIDAsMjMzIDE4OSw0MjEgNDIxLDQyMWwwIDB6IgogICBpZD0icGF0aDE3IiAvPgogICAgPHBhdGgKICAgY2xhc3M9ImZpbDEiCiAgIGQ9Ik02NDk3IDMxNThjMzIwLDAgNTc5LC0yNTkgNTc5LC01NzkgMCwtMzIwIC0yNTksLTU3OSAtNTc5LC01NzkgLTMxOSwwIC01NzksMjU5IC01NzksNTc5IDAsMzIwIDI2MCw1NzkgNTc5LDU3OWwwIDB6IgogICBpZD0icGF0aDE5IiAvPgogICA8L2c+CiAgIDxyZWN0CiAgIGNsYXNzPSJmaWwyIgogICB3aWR0aD0iMTI5ODYiCiAgIGhlaWdodD0iMTEyNDgiCiAgIGlkPSJyZWN0MjMiIC8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K"

const generateLabelPDF = () => {
    const element = document.querySelector('.label');
    const opt = {
        margin: 0.5,
        filename: 'etiqueta_envio.pdf',
        image: { type: 'jpeg', quality: 10 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
};



export default function ShippingLabel() {

    const [shippingData, setshippingData] = useState(dataDefault);


    // eslint-disable-next-line no-unused-vars
    const handleClick = () => {
        generateLabelPDF();
    };

    const [{ data, fetching, error }] = useQuery({
      query: OrderQuery
    });
    
    useEffect(() => {
      if (!fetching && data) {
        setshippingData(mapResponseToData(data))
      }
    }, [data, fetching]);


      // if (fetching) { return <div>Cargando...</div>; }
    
      if (error) { return <div>Error: {error.message}</div>;  }
    
      return (
        <div className='label page-width'>
          <div className="seller-info item">
            <img src={`data:image/png;base64,${shippingData.sellerInfo.logo}`} alt="Logo empresa" />
            <p className="product-quantity">{shippingData.sellerInfo.name}</p>
            <p className="product-quantity">{shippingData.sellerInfo.address}</p>
            <p className="product-quantity">{shippingData.sellerInfo.email}</p>
            <p className="product-quantity">
              <a href={`http://${shippingData.sellerInfo.website}`} target="_blank" rel="noreferrer">
                {shippingData.sellerInfo.website}
              </a>
            </p>
            <img className='badajozImg' src={badajozimg} alt='Badajoz Logo'/>
          </div>
    
          <div className="data item">
            <div className="product-info">
              <h2 className="product-name">Paquete</h2>
              <p className="product-quantity">Cantidad: {shippingData.productInfo.quantity}</p>
              <p className="product-price">Total: {shippingData.productInfo.priceTotal}</p>
            </div>
    
            <div className="shipping-info">
              <h3 className="shipping-title">Información de Envío</h3>
              <p className="shipping-name">Nombre del destinatario: {shippingData.shippingInfo.recipientName}</p>
              <p className="shipping-address">Dirección: {shippingData.shippingInfo.address}</p>
              <p className="shipping-postal-code">Código Postal: {shippingData.shippingInfo.postalCode}</p>
              <p className="shipping-phone">Teléfono: {shippingData.shippingInfo.phone}</p>
            </div>
          </div>
    
          <div className="order-info item">
            <p className="order-number">Número de Pedido: {shippingData.orderInfo.orderNumber}</p>
            <p className="order-date">Fecha de Pedido: {shippingData.orderInfo.orderDate}</p>
             <p className="delivery-date">Fecha Estimada de Entrega: {shippingData.orderInfo.orderDate}</p>  {/* Fata aqui fecha de entrega */}
            <Barcode id='barcode' value="1" displayValue={false} />   {/* Falta fijar como de creara codigo de barra */}
          </div>
        </div>
      );
};
export const layout = {
    areaId: 'content',
    sortOrder: 10
};



const dataDefault = {
    sellerInfo: {
        name: "Badajoz Marketplace",
        address: " ",
        logo:" ",
        id:1,
        email: "contacto@badajoz.com",
        website: "www.badajoz.com"
    },
    productInfo: {
        quantity: 0,
        priceTotal: 0
    },
    shippingInfo: {
        recipientName: " ",
        address: " ",
        postalCode: " ",
        phone: " "
    },
    orderInfo: {
        orderNumber: " ",
        orderDate: " ",
        deliveryDate: " ",
        trackingNumber: " ",
        isFragile:false,
        orderNotes: " "
    },
    barcode: {
        value: "Badajoz"
    }
};


// const response = {
//   "order": {
//             "orderId": "1",
//             "uuid": "c4ad97aa-ca75-4177-806a-1097ff6327fc",
//             "orderNumber": "10001",
//             "grandTotal": {
//                 "currency": "USD",
//                 "value": 272
//             },
//             "createdAt": {
//                 "value": "1723650976034"
//             },
//             "items": [
//                 {
//                     "qty": 3,
//                     "__typename": "OrderItem"
//                 }
//             ],
//             "shippingAddress": {
//                 "orderAddressId": 1,
//                 "uuid": "9d58bf90-bc5f-48d7-bd3a-5efc51e570e1",
//                 "fullName": "D",
//                 "postcode": "231",
//                 "telephone": "D",
//                 "city": "D",
//                 "address1": "DD",
//                 "address2": null,
//                 "country": {
//                     "name": "United States",
//                     "__typename": "Country"
//                 },
//                 "province": {
//                     "name": "Alaska",
//                     "__typename": "Province"
//                 },
//                 "__typename": "OrderAddress"
//             },
//             "currency": "USD",
//             "customerEmail": "darwin.elegiga02@gmail.com",
//             "totalQty": 3,
//             "shippingNote": null,
//             "shipment": null,
//             "updatedAt": "1723650976034",
//             "__typename": "Order"
//         }
// };




