
const pay = () =>{
	//className("android.widget.TextView").text("提交订单").findOne().parent().click()
	var a=text("提交订单").findOne().bounds();
	var b=a.centerX();
	var c=a.centerY();
	click(b,c)
}

const selectTime = (countT,status) =>{

	if(textStartsWith("提交订单").exists()){
		sleep(50)
		status=true
		toast('1')
		pay()
		toast('2')
	}else{
		countT=countT+1;
		if(countT>18000){
			toast('抢菜超时间失败')
			exit;
		}
		sleep(10)
		selectTime(countT,false)

	}
}



const submit_order = (count) => {

		toast('抢菜第'+count+'次尝试')
		id('button_cart_charge').findOne().click() //结算按钮点击

		sleep(900)

		if(textStartsWith('非常抱歉，当前商品运力不足(063)').exists()){
			back()
		}else if (textStartsWith('很抱歉，下单失败').exists()) {
			back()
		}else{
			if(textStartsWith('放弃机会').exists()){
				toast('跳过加购')
				textStartsWith('放弃机会').findOne().parent().click()
			}


			selectTime(0,false)
		}

		sleep(100)
		count=count+1;
		if(count>18000){
			toast('抢菜失败')
			exit;
		}
		submit_order(count)
}

const start = () => {

	const appName = "盒马";
	launchApp(appName);
	sleep(20);  
	auto.waitFor()
	submit_order(0)
}
start()