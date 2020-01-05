import styled from 'styled-components';

export const BillingWrapper = styled.div`
	.banner {
		height: 72px;
		width: 100%;
		background-color: #F4F6F6;
		padding: 20px 50px;
		font-size: 20px;
		color: #424242;

		button {
			width: 84px;
			height: 31px;
			background-color: white;
			font-size: 13px;
			border: 1px solid #D5DBDB;
			border-radius: 2px !important;
			float: right;

			i {
				font-size: 15px;
		    color: red;
		    vertical-align: sub;
		    margin-right: 5px;
			}
		}
	}


	.mid {
		width: 95%;
		padding: 52px;

		.inner {
			width: 100%;
			display: inline-flex;

			.indiv {
				width: 25%;
				height: 188px;
				border: 1px solid #D5DBDB;
				padding: 25px;
				display: inline-grid;
				text-align: center;

				.num {
					font-size: 16px;
					margin-top: -55px;
				}

				.days {
					font-size: 13px;
					margin-top: -35px;
				}

				label {
					font-size: 16px;
					color: #424242;
				}

				.plan {
					display: grid;

					label:nth-child(2) {
						font-size: 13px;
					}
				}

				img {
					width: 110px;
			    height: 93px;
			    margin: auto;
				}

				button {
					border: 1px solid #D5DBDB;
					min-width: 111px;
					height: 31px;
					margin: auto;
					background-color: rgba(213,219,219,0.25);
					font-size: 13px;
					cursor: pointer;
				}
			}	
		}
		
	}

	.invoices {
		padding: 0px 130px;
		font-size: 16px;
		display: grid;

		.wrapper {
			display: inline-flex;
		}

		.filter {
			margin-top: 27px;
			font-size: 13px;

			input {
				height: 32px;
		    border: 1px solid #D5DBDB;
		    text-align: center;
		    font-size: 13px;
		    vertical-align: bottom;
			}

			button {
				padding: 5px 15px;
				border: 1px solid #D5DBDB;
				background-color: rgba(213,219,219,0.25);
				cursor: pointer;
				height: 32px;
			}

			.from {
				border-top-left-radius: 2px !important;
				border-bottom-left-radius: 2px !important;
			}

			.apply {
				background-color: white;
				border-top-right-radius: 2px !important;
				border-bottom-right-radius: 2px !important;
			}
		}

		.type {
			margin-top: 27px;
			margin-left: 20px;
			display: inline-flex;
			font-size: 13px;

			.t-type {
				padding: 5px 15px;
				border: 1px solid #D5DBDB;
				background-color: rgba(213,219,219,0.25);
				cursor: pointer;
				border-top-left-radius: 2px !important;
				border-bottom-left-radius: 2px !important;
			}

			.ant-select-selection {
				border-top-left-radius: 0px !important;
				border-bottom-left-radius: 0px !important;
				font-size: 13px;
			}
		}
	}

	.table {
		padding: 20px 130px;
		font-size: 13px;
	}

	.pagination {
		margin-top: 20px;
		text-align: center;

		i {
			vertical-align: text-top;
		}

		.ant-select {
			float: right;
			margin-top: -30px;

			.ant-select-selection {
				width: 60px;
			}
		}
	}

`;