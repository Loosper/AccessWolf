class LogController < ApplicationController

  # POST /logs.json
  def create
    json = JSON.parse request.body.read

    @student = Student.where(:guid => json["uid"]).first;
    puts "ROOM IS: #{json["room"]}"
    # @student = "blabla"
    if @student.nil?
      head 401
    else
      @CurrentAttendance = CurrentAttendance.new
      head 200
    end

  end
end
